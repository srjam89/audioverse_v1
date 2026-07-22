import { useState, useEffect } from "react";
import { getCategories } from "@/services/category-api";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const categoryImageModules = import.meta.glob("../assets/c/**/*", {
  eager: true,
  import: "default",
  query: "?url",
});

const categoryImagesById = Object.fromEntries(
  Object.entries(categoryImageModules)
    .map(([path, url]) => {
      const categoryId = path.match(/\/c\/(\d+)\//)?.[1];
      return categoryId ? [categoryId, url] : null;
    })
    .filter(Boolean),
);

export default function HomeCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    getCategories({ signal: controller.signal })
      .then(setCategories)
      .catch((requestError) => {
        if (requestError.code !== "ERR_CANCELED") {
          console.error("Unable to load categories:", requestError);
          setError("Unable to load categories.");
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold">SHOP BY CATEGORY</h1>
      {isLoading && (
        <p className="text-muted-foreground">Loading categories...</p>
      )}
      {error && <p className="text-destructive">{error}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <Card
            className="relative col-span-1 aspect-[3/2] overflow-hidden p-0"
            key={category.id}
          >
            <CardContent className="h-full p-0">
              {categoryImagesById[category.id] && (
                <img
                  src={categoryImagesById[category.id]}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              )}
              <span className="absolute bottom-8 left-6 text-lg font-semibold">
                {category.name}
              </span>
              <Link
                className="absolute bottom-3 left-6 text-(--muted-foreground) text-sm"
                to={`/category${category.link_rewrite}`}
              >
                View All
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="ml-2 text-(--accent)"
                />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
