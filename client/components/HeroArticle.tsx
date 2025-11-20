import { Link } from "react-router-dom";
import { Film, ArrowRight } from "lucide-react";
import type { Article } from "@shared/api";

interface HeroArticleProps {
  article: Article;
}

function getCategoryTagClass(slug: string): string {
  const categorySlug = slug.replace(/-/g, "").toLowerCase();
  return `category-tag-${categorySlug}`;
}

export function HeroArticle({ article }: HeroArticleProps) {
  const isVideo = !!article.videoUrl;
  const tagClass = getCategoryTagClass(article.category.slug);

  return (
    <div className="relative w-full group overflow-hidden bg-background">
      {/* Hero image container */}
      <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[65vh] max-h-[720px]">
        {/* Video indicator */}
        {isVideo && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 pointer-events-none">
            <Film className="h-16 w-16 text-white/90" />
          </div>
        )}

        {/* Hero image */}
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlay - dark to light */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-end pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14 lg:pb-16 pointer-events-auto">
          <div className="max-w-3xl space-y-4">
            {/* Category tag */}
            <Link
              to={`/category/${article.category.slug}`}
              className={`category-tag ${tagClass} hover:opacity-75 transition-opacity inline-block`}
            >
              {article.category.name}
            </Link>

            {/* Hero headline */}
            <Link to={`/article/${article.slug}`}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white hover:text-white/95 transition-colors cursor-pointer">
                {article.title}
              </h1>
            </Link>

            {/* Hero subheading */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed line-clamp-2 font-light max-w-2xl">
              {article.excerpt}
            </p>

            {/* Meta and CTA */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-white/80">
                <span className="font-medium">{article.author.name}</span>
                <span className="text-white/60">•</span>
                <time className="text-white/80">{article.publishedAt}</time>
              </div>
              <Link
                to={`/article/${article.slug}`}
                className="ml-auto inline-flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-white/90 transition-all duration-300 group"
              >
                <span className="text-sm">Read Story</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
