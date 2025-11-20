import { Link, useLocation } from "react-router-dom";
import { useDataStore } from "@/hooks/useDataStore";
import { usePublicLayout } from "@/components/PublicLayoutContext";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PublicSidebar() {
  const { categories, isInitialized } = useDataStore();
  const location = useLocation();
  const { setSidebarOpen } = usePublicLayout();

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-white border-r">
      <div className="p-6 border-b">
        <Link to="/" onClick={handleLinkClick}>
          <span className="font-serif text-2xl font-light tracking-tight text-foreground hover:text-muted-foreground transition-colors">
            Readme Hub
          </span>
        </Link>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-6">
          <ul className="space-y-6">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className={`block text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Home
              </Link>
            </li>

            {isInitialized && categories.length > 0 && (
              <li>
                <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  Categories
                </h4>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/category/${category.slug}`}
                        onClick={handleLinkClick}
                        className={`block text-sm transition-colors ${
                          location.pathname === `/category/${category.slug}`
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );
}
