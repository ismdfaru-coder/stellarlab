import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useDataStore } from "@/hooks/useDataStore";
import { useState, useEffect } from "react";

export default function AdminEditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, categories } = useDataStore();
  const [isLoading, setIsLoading] = useState(false);

  const article = articles.find((a) => a.id === id);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    videoUrl: "",
    categoryId: "",
    featured: false,
  });

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        videoUrl: article.videoUrl || "",
        categoryId: article.category.id,
        featured: article.featured,
      });
    }
  }, [article]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      alert("Article updated successfully!");
      navigate("/admin");
    }, 1000);
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to admin
          </Link>
          <h1 className="text-4xl font-serif font-bold mb-4">
            Article not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to admin</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold">Edit Article</h1>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSave} className="space-y-8">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-4 max-h-64 rounded border border-border"
              />
            )}
          </div>

          {/* Video URL */}
          <div>
            <label
              htmlFor="videoUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Video URL (YouTube)
            </label>
            <input
              id="videoUrl"
              type="text"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Paste a YouTube link. Supports youtube.com/watch?v=ID or
              youtu.be/ID format
            </p>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-4 py-2 border border-border bg-background text-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              Mark as featured
            </label>
          </div>

          {/* Submit button */}
          <div className="flex gap-4 pt-8 border-t border-border">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded hover:bg-muted transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
