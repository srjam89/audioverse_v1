import Search from "./components/search";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faBars,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="flex items-center gap-3 p-2 lg:grid lg:grid-cols-12">
      <div className="min-w-0 flex-1 lg:col-span-2">
        <img
          src={
            isDark ? "/audioverse-logo.svg" : "/audioverse-logo-light.svg"
          }
          alt="Audioverse Logo"
          className="h-auto w-40 sm:w-48"
        />
      </div>
      <nav
        className="hidden lg:col-span-4 lg:block"
        aria-label="Main navigation"
      >
        <ul className="flex items-center justify-start gap-8">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="border-b-2 border-transparent py-2 transition-colors hover:border-(--accent)"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden lg:col-span-4 lg:block">
        <Search />
      </div>
      <div className="ml-auto flex items-center justify-end gap-4 lg:col-span-2 lg:ml-0">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="text-xl" />
        </Button>
        <FontAwesomeIcon icon={faUser} className="text-xl" />
        <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
      </div>
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open navigation"
            />
          }
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </SheetTrigger>
        <SheetContent side="right" className="w-[85%] max-w-sm">
          <SheetHeader>
            <SheetTitle>
              <img
                src={
                  isDark ? "/audioverse-logo.svg" : "/audioverse-logo-light.svg"
                }
                alt="Audioverse Logo"
                className="h-auto w-40 sm:w-48"
              />
            </SheetTitle>
            <SheetDescription>
              Search products or choose a page.
            </SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <Search />
          </div>
          <nav className="px-4" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose
                    render={
                      <a
                        href={link.href}
                        className="block rounded-lg px-3 py-3 text-base transition-colors hover:bg-accent hover:text-accent-foreground"
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
