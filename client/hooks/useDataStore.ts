import { useState, useCallback, useEffect } from "react";
import type { Article, Category } from "@shared/api";

interface SiteConfig {
  about: { title: string; content: string; updatedAt: string };
  termsOfService: { title: string; content: string; updatedAt: string };
}

interface DataStore {
  articles: Article[];
  categories: Category[];
  siteConfig: SiteConfig | null;
  isInitialized: boolean;
  getArticleById: (id: string) => Article | undefined;
  createArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  removeArticle: (articleId: string) => void;
  addCategory: (category: Category) => void;
  removeCategory: (categoryId: string) => void;
  updateSiteConfig: (section: keyof SiteConfig, data: any) => void;
}

export function useDataStore(): DataStore {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/articles");

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }

        const data = await response.json();

        // Parse categories
        const parsedCategories: Category[] =
          data.categories?.map((cat: any) => ({
            id: String(cat.id),
            name: cat.name,
            slug: cat.slug,
          })) || [];

        // Parse site config
        if (data.siteConfig) {
          setSiteConfig(data.siteConfig);
        }

        // Parse articles - they're already transformed by the backend
        const parsedArticles: Article[] =
          data.articles?.map((article: any) => ({
            id: String(article.id),
            title: article.title,
            excerpt: article.excerpt,
            content: article.content || "",
            slug: article.slug,
            imageUrl: article.imageUrl,
            imageHint: article.imageHint,
            videoUrl: article.videoUrl,
            category: {
              id: String(article.category.id),
              name: article.category.name,
              slug: article.category.slug,
            },
            author: {
              id: article.author?.id || "unknown",
              name: article.author?.name || "Unknown Author",
            },
            publishedAt: article.publishedAt,
            featured: article.featured || false,
            createdAt: article.createdAt || new Date().toISOString(),
            updatedAt: article.updatedAt || new Date().toISOString(),
          })) || [];

        setCategories(parsedCategories);
        setArticles(parsedArticles);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error loading articles:", error);
        setIsInitialized(true);
      }
    };

    loadData();
  }, []);

  const getArticleById = useCallback(
    (id: string) => {
      return articles.find((a) => a.id === id);
    },
    [articles],
  );

  const createArticle = useCallback((newArticle: Article) => {
    setArticles((prevArticles) => {
      let newArticles = [...prevArticles];
      if (newArticle.featured) {
        newArticles = newArticles.map((a) => ({ ...a, featured: false }));
      }
      if (!newArticles.find((a) => a.id === newArticle.id)) {
        return [newArticle, ...newArticles];
      }
      return newArticles;
    });
  }, []);

  const updateArticle = useCallback((updatedArticle: Article) => {
    setArticles((prevArticles) => {
      let newArticles = [...prevArticles];
      if (updatedArticle.featured) {
        newArticles = newArticles.map((a) =>
          a.id !== updatedArticle.id ? { ...a, featured: false } : a,
        );
      }

      return newArticles.map((article) => {
        if (article.id === updatedArticle.id) {
          return updatedArticle;
        }
        return article;
      });
    });
  }, []);

  const removeArticle = useCallback((articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
  }, []);

  const addCategory = useCallback((newCategory: Category) => {
    setCategories((prev) => {
      if (!prev.find((c) => c.id === newCategory.id)) {
        return [...prev, newCategory];
      }
      return prev;
    });
  }, []);

  const removeCategory = useCallback((categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    setArticles((prev) => prev.filter((a) => a.category.id !== categoryId));
  }, []);

  return {
    articles,
    categories,
    isInitialized,
    getArticleById,
    createArticle,
    updateArticle,
    removeArticle,
    addCategory,
    removeCategory,
  };
}
