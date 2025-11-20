import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicLayout } from "@/components/PublicLayoutContext";
import { useDataStore } from "@/hooks/useDataStore";

export function SiteHeader() {
  const { toggleSidebar } = usePublicLayout();
  const { categories, isInitialized } = useDataStore();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main header */}
        <div className="flex h-24 items-center justify-between gap-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 text-foreground hover:bg-muted"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          {/* Logo - Editorial style */}
          <Link to="/" className="flex-shrink-0 -ml-2 md:ml-0">
            <div className="flex flex-col leading-none">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Readme
              </h1>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">
                Stories &amp; Ideas
              </p>
            </div>
          </Link>

          {/* Desktop navigation - cleaner style */}
          <nav className="hidden lg:flex items-center gap-12 ml-auto mr-6">
            {isInitialized &&
              categories.slice(0, 5).map((category) => {
                const isActive =
                  location.pathname === `/category/${category.slug}`;
                return (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className={`text-sm transition-colors duration-200 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
          </nav>

          {/* Admin and Search buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-foreground hover:bg-muted"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Topics bar - mobile & tablet visible */}
        <div className="hidden sm:flex md:flex lg:hidden items-center gap-3 pb-4 border-t border-border/50 pt-4 overflow-x-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground shrink-0">
            Topics
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 pr-4">
            {isInitialized &&
              categories.map((category) => {
                const categorySlug = category.slug
                  .replace(/-/g, "")
                  .toLowerCase();
                const tagClass = `category-tag-${categorySlug}`;
                return (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className={`category-tag ${tagClass} hover:opacity-80 transition-opacity shrink-0`}
                  >
                    {category.name}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </header>
  );
}
