import { Link } from "react-router-dom";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 md:py-16">
          {/* Brand section */}
          <div className="space-y-4">
            <Link to="/" className="block">
              <h3 className="font-serif text-xl font-bold">Readme</h3>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">
                Stories &amp; Ideas
              </p>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A curated collection of stories, essays, and insights on culture,
              technology, and ideas.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-foreground">
              Sections
            </h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                All Stories
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social/Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-foreground">
              Legal
            </h4>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Bottom footer */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} Readme Hub. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Thoughtfully curated. Beautifully presented.
          </p>
        </div>
      </div>
    </footer>
  );
}
