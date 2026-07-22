import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { searchProducts } from "@/services/product-search-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const productImageModules = import.meta.glob("../assets/p/**/*", {
  eager: true,
  import: "default",
  query: "?url",
});

const productImagesById = Object.fromEntries(
  Object.entries(productImageModules)
    .map(([path, url]) => {
      const productId = path.match(/\/p\/(\d+)\//)?.[1];
      return productId ? [productId, url] : null;
    })
    .filter(Boolean),
);

function formatPrice(price) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(Number(price));
}

function resetSearchState(setters) {
  const { setResults, setError, setIsLoading, setIsOpen, setActiveIndex } =
    setters;

  setResults([]);
  setError("");
  setIsLoading(false);
  setIsOpen(false);
  setActiveIndex(-1);
}

export default function Search() {
  const navigate = useNavigate();
  const listboxId = useId();
  const rootRef = useRef(null);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const trimmedQuery = query.trim();
  const canSearch = trimmedQuery.length >= 2;
  const showDropdown = isOpen && canSearch;

  useEffect(() => {
    if (!canSearch) {
      abortControllerRef.current?.abort();
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const requestId = ++requestIdRef.current;

      setIsLoading(true);
      setError("");
      setIsOpen(true);

      searchProducts(trimmedQuery, { signal: controller.signal })
        .then((products) => {
          if (requestId !== requestIdRef.current) return;
          setResults(products);
          setActiveIndex(products.length > 0 ? 0 : -1);
        })
        .catch((requestError) => {
          if (
            requestError.code === "ERR_CANCELED" ||
            requestId !== requestIdRef.current
          ) {
            return;
          }

          console.error("Unable to search products:", requestError);
          setResults([]);
          setError("Unable to search products.");
          setActiveIndex(-1);
        })
        .finally(() => {
          if (requestId === requestIdRef.current) {
            setIsLoading(false);
          }
        });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [canSearch, trimmedQuery]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  const closeDropdown = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const selectProduct = (product) => {
    closeDropdown();
    setQuery("");
    resetSearchState({
      setResults,
      setError,
      setIsLoading,
      setIsOpen,
      setActiveIndex,
    });
    navigate(`/product${product.link_rewrite}`);
  };

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);

    if (nextQuery.trim().length < 2) {
      abortControllerRef.current?.abort();
      resetSearchState({
        setResults,
        setError,
        setIsLoading,
        setIsOpen,
        setActiveIndex,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      return;
    }

    if (!showDropdown || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) =>
        current < results.length - 1 ? current + 1 : 0,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current > 0 ? current - 1 : results.length - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      selectProduct(results[activeIndex]);
    }
  };

  const activeOptionId =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <Field orientation="horizontal">
      <div className="relative w-full" ref={rootRef}>
        <Input
          type="search"
          name="search"
          value={query}
          placeholder="Search for products..."
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          className="pr-10"
          onChange={handleQueryChange}
          onFocus={() => {
            if (canSearch) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
        />

        <Button
          type="button"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 border-none bg-transparent p-0 shadow-none hover:bg-transparent"
          aria-label="Search products"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="!h-3 !w-3 text-text-h text-(--accent)"
          />
        </Button>

        {showDropdown && (
          <div
            id={listboxId}
            role="listbox"
            aria-label="Product search results"
            className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
          >
            {isLoading && (
              <p className="px-3 py-3 text-sm text-muted-foreground">
                Searching...
              </p>
            )}

            {!isLoading && error && (
              <p className="px-3 py-3 text-sm text-destructive">{error}</p>
            )}

            {!isLoading && !error && results.length === 0 && (
              <p className="px-3 py-3 text-sm text-muted-foreground">
                No products found for “{trimmedQuery}”.
              </p>
            )}

            {!isLoading &&
              !error &&
              results.map((product, index) => {
                const isActive = index === activeIndex;

                return (
                  <Link
                    key={product.id}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isActive}
                    to={`/product${product.link_rewrite}`}
                    className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted"
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      closeDropdown();
                      setQuery("");
                      resetSearchState({
                        setResults,
                        setError,
                        setIsLoading,
                        setIsOpen,
                        setActiveIndex,
                      });
                    }}
                  >
                    {productImagesById[product.id] ? (
                      <img
                        src={productImagesById[product.id]}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 shrink-0 rounded bg-muted" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </Field>
  );
}
