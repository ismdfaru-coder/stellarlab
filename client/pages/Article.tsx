import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { PublicLayout } from "@/components/PublicLayout";
import { ShareModal } from "@/components/ShareModal";
import { Comments } from "@/components/Comments";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useDataStore } from "@/hooks/useDataStore";
import { ArrowLeft, Share2 } from "lucide-react";

function getCategoryBorderClass(slug: string): string {
  const categorySlug = slug.replace(/-/g, "").toLowerCase();
  return `category-border-${categorySlug}`;
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { articles } = useDataStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PublicLayout>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-serif text-5xl font-light mb-4">
            Article not found
          </h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            The article you're looking for doesn't exist or has been removed.
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

  const borderClass = getCategoryBorderClass(article.category.slug);

  return (
    <PublicLayout>
      <article className="w-full bg-background">
        {/* Article header section */}
        <div className="border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to stories
            </Link>

            {/* Metadata and category */}
            <div className={`mb-8 ${borderClass} category-border pl-6`}>
              <Link
                to={`/category/${article.category.slug}`}
                className="text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors inline-block mb-4"
              >
                {article.category.name}
              </Link>

              {/* Title */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                {article.title}
              </h1>

              {/* Dek/subheading */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-2xl mb-8">
                {article.excerpt}
              </p>

              {/* Author and date info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-6">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">
                    {article.author.name}
                  </span>
                  <span className="text-border/50">•</span>
                  <time className="text-muted-foreground">
                    {article.publishedAt}
                  </time>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="ml-auto flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-medium text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured media - video or image */}
        {article.videoUrl ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <VideoPlayer
              videoUrl={article.videoUrl}
              title={article.title}
              posterImage={article.imageUrl}
            />
          </div>
        ) : (
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-muted overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="space-y-8">
            {/* Introduction paragraph */}
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-light first-letter:font-bold first-letter:text-2xl">
              {article.excerpt}
            </p>

            {/* Body content */}
            {article.content && (
              <div className="space-y-6">
                {article.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base md:text-lg leading-relaxed text-foreground/90"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Article footer */}
          <div className="border-t border-border mt-16 pt-8">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  About the author
                </p>
                <p className="text-foreground font-medium">
                  {article.author.name}
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 border border-foreground text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="border-t border-border mt-12 pt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all stories
            </Link>
          </nav>
        </div>

        {/* Comments section */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Comments articleSlug={article.slug} />
        </div>
      </article>

      {/* Share modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={article.title}
        url={`${window.location.origin}/article/${article.slug}`}
      />
    </PublicLayout>
  );
}
