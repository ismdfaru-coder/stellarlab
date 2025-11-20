import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/PublicLayout";
import { ArticleCard } from "@/components/ArticleCard";
import { useDataStore } from "@/hooks/useDataStore";
import { ArrowLeft } from "lucide-react";

function getCategoryTagClass(slug: string): string {
  const categorySlug = slug.replace(/-/g, "").toLowerCase();
  return `category-tag-${categorySlug}`;
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { categories, articles } = useDataStore();

  const category = categories.find((c) => c.slug === slug);
  const categoryArticles = articles.filter((a) => a.category.slug === slug);

  if (!category) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Link>
          <h1 className="font-serif text-5xl font-light mb-4">
            Category not found
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to stories
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const tagClass = getCategoryTagClass(category.slug);

  return (
    <PublicLayout>
      <div className="w-full bg-background">
        {/* Category header */}
        <div className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to stories
            </Link>

            {/* Category tag */}
            <div className={`category-tag ${tagClass} mb-6 inline-block`}>
              {category.name}
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              {category.name}
            </h1>

            {/* Description/meta */}
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore {categoryArticles.length} article
              {categoryArticles.length !== 1 ? "s" : ""} in the {category.name}{" "}
              category, covering the latest ideas and stories.
            </p>
          </div>
        </div>

        {/* Articles section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-24">
              <div className="text-center max-w-md">
                <h2 className="font-serif text-4xl font-light text-muted-foreground mb-4">
                  No articles yet
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  No articles have been published in this category yet. Check
                  back soon for new content.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
