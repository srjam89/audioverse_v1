import { useCallback, useEffect, useState } from "react";
import { getImageSlides } from "@/services/image-slider-api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Vite must discover local images at build time. This creates a lookup where
// database filenames such as "boom-max.png" resolve to their generated URLs.
const imageModules = import.meta.glob("../assets/carousel/*", {
  eager: true,
  import: "default",
  query: "?url",
});

const imagesByFilename = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path.split("/").pop(),
    url,
  ]),
);

export default function HeroCarousel() {
  // Embla's API controls navigation and reports which slide is selected.
  const [carouselApi, setCarouselApi] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Slides come from PostgreSQL through the Express API.
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Shadcn passes through the underlying Embla instance once it is ready.
  const handleApi = useCallback((newCarouselApi) => {
    setCarouselApi(newCarouselApi);
    setSelectedIndex(newCarouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    // Abort the Axios request if the carousel unmounts before it completes.
    const controller = new AbortController();

    getImageSlides({ signal: controller.signal })
      .then(setSlides)
      .catch((requestError) => {
        if (requestError.code !== "ERR_CANCELED") {
          console.error("Unable to load carousel slides:", requestError);
          setError("Unable to load carousel images.");
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    // Keep the active pagination indicator synchronized with Embla.
    const handleSelect = () =>
      setSelectedIndex(carouselApi.selectedScrollSnap());

    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
    };
  }, [carouselApi]);

  return (
    <Carousel
      setApi={handleApi}
      className="absolute inset-0 h-full w-full [&_[data-slot=carousel-content]]:h-full [&_[data-slot=carousel-content]>div]:h-full"
    >
      <CarouselContent>
        {isLoading && (
          <CarouselItem className="h-full">
            <div className="flex h-full items-center justify-center bg-muted">
              Loading slides...
            </div>
          </CarouselItem>
        )}
        {error && (
          <CarouselItem className="h-full">
            <div className="flex h-full items-center justify-center bg-muted text-destructive">
              {error}
            </div>
          </CarouselItem>
        )}
        {!isLoading &&
          !error &&
          slides.map((slide, index) => (
            <CarouselItem key={`${slide.url}-${slide.image}`} className="h-full">
              <a
                href={slide.url}
                className="block h-full"
                aria-label={`View promotion ${index + 1}`}
              >
                <picture className="block h-full overflow-hidden">
                  {/* Use the mobile asset below Tailwind's lg breakpoint. */}
                  {slide.image_mobile && (
                    <source
                      media="(max-width: 1023px)"
                      srcSet={imagesByFilename[slide.image_mobile]}
                    />
                  )}
                  <img
                    src={imagesByFilename[slide.image]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </picture>
              </a>
            </CarouselItem>
          ))}
      </CarouselContent>
      {/* Navigation is unnecessary when the API returns only one slide. */}
      {slides.length > 1 && (
        <>
          <CarouselPrevious className="left-3 z-10 border-white/30 bg-black/40 text-white hover:bg-black/60" />
          <CarouselNext className="right-3 z-10 border-white/30 bg-black/40 text-white hover:bg-black/60" />
          <div
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-3 py-2"
            role="tablist"
            aria-label="Choose slide"
          >
            {slides.map((slide, index) => (
              <button
                key={`${slide.url}-${index}`}
                type="button"
                role="tab"
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={selectedIndex === index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? "w-6 bg-(--accent)"
                    : "w-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </Carousel>
  );
}
