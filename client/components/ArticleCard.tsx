import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import type { Article } from "@shared/api";

interface ArticleCardProps {
  article: Article;
}

function getCategoryTagClass(slug: string): string {
  const categorySlug = slug.replace(/-/g, "").toLowerCase();
  return `category-tag-${categorySlug}`;
}

function getCategoryBorderClass(slug: string): string {
  const categorySlug = slug.replace(/-/g, "").toLowerCase();
  return `category-border-${categorySlug}`;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const isVideo = !!article.videoUrl;
  const tagClass = getCategoryTagClass(article.category.slug);
  const borderClass = getCategoryBorderClass(article.category.slug);

  return (
    <article className="flex flex-col group h-full overflow-hidden bg-card transition-all duration-300 hover:shadow-md">
      {/* Image container */}
      <Link
        to={`/article/${article.slug}`}
        className="block overflow-hidden bg-muted aspect-video relative"
      >
        <div className="relative w-full h-full">
          {isVideo && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <Film className="h-14 w-14 text-white/95" />
            </div>
          )}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-6 border-l-4 ${borderClass} bg-card`}>
        {/* Category tag */}
        <Link
          to={`/category/${article.category.slug}`}
          className={`category-tag ${tagClass} mb-3 w-fit hover:opacity-75 transition-opacity text-xs`}
        >
          {article.category.name}
        </Link>

        {/* Headline */}
        <h3 className="font-serif text-lg md:text-xl font-bold leading-tight mb-3 line-clamp-3">
          <Link
            to={`/article/${article.slug}`}
            className="hover:text-muted-foreground transition-colors text-foreground"
          >
            {article.title}
          </Link>
        </h3>

        {/* Dek/Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/30 mt-auto">
          <span className="font-medium">{article.author.name}</span>
          <span className="opacity-50">•</span>
          <time className="text-muted-foreground/70">{article.publishedAt}</time>
        </div>
      </div>
    </article>
  );
}
