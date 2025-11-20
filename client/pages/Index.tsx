import { PublicLayout } from "@/components/PublicLayout";
import { ArticleCard } from "@/components/ArticleCard";
import { HeroArticle } from "@/components/HeroArticle";
import { useDataStore } from "@/hooks/useDataStore";
import { Link } from "react-router-dom";

export default function Index() {
  const { articles, isInitialized } = useDataStore();

  if (!isInitialized) {
    return (
      <PublicLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-pulse">
              <div className="h-8 w-32 bg-muted rounded"></div>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Loading your stories...
            </p>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const featuredArticle = articles.find((article) => article.featured);
  const regularArticles = articles.filter((article) => !article.featured);

  return (
    <PublicLayout>
      <div className="w-full bg-background">
        {articles.length > 0 ? (
          <>
            {/* Featured hero section */}
            {featuredArticle && <HeroArticle article={featuredArticle} />}

            {/* Latest stories section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              {/* Section header with underline */}
              <div className="mb-12 pb-8 border-b border-border">
                <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground mb-3">
                  Latest Stories
                </h2>
                <p className="text-muted-foreground text-sm max-w-md">
                  Discover the most recent articles, essays, and insights from
                  our editorial team.
                </p>
              </div>

              {/* Articles grid */}
              {regularArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.slice(0, 12).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No additional articles available at this time.
                  </p>
                </div>
              )}

              {/* Load more section */}
              {regularArticles.length > 12 && (
                <div className="mt-16 flex justify-center">
                  <button className="px-8 py-3 border border-foreground text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-300">
                    Load More Stories
                  </button>
                </div>
              )}
            </section>

            {/* Popular section - if we have enough articles */}
            {regularArticles.length > 12 && (
              <section className="border-t border-border bg-muted/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                  {/* Section header */}
                  <div className="mb-12 pb-8 border-b border-border">
                    <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-muted-foreground mb-3">
                      Trending Now
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-md">
                      The most read and shared articles this month.
                    </p>
                  </div>

                  {/* Popular grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularArticles.slice(12, 18).map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Newsletter section */}
            <section className="border-t border-border py-16 md:py-20">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                  Get the latest stories
                </h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Subscribe to receive curated articles, essays, and insights
                  delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground text-sm flex-1 sm:flex-none"
                  />
                  <button className="px-6 py-3 bg-foreground text-background font-medium text-sm hover:bg-muted-foreground transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex items-center justify-center py-32">
            <div className="text-center max-w-md px-4">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
                No articles yet
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're preparing some great stories for you. Check back soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
