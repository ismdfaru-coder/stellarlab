import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, ArrowLeft, LogOut } from "lucide-react";
import { useDataStore } from "@/hooks/useDataStore";
import { useEffect } from "react";

export default function Admin() {
  const navigate = useNavigate();
  const { articles, categories } = useDataStore();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to site</span>
              </Link>
              <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors border border-border rounded hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest mb-2">
              Total Articles
            </p>
            <p className="text-4xl font-bold">{articles.length}</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest mb-2">
              Categories
            </p>
            <p className="text-4xl font-bold">{categories.length}</p>
          </div>
          <div className="p-6 border border-border rounded-lg bg-card">
            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest mb-2">
              Featured
            </p>
            <p className="text-4xl font-bold">
              {articles.filter((a) => a.featured).length}
            </p>
          </div>
        </div>

        {/* Articles Section */}
        <div className="border border-border rounded-lg bg-card flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-semibold">Articles ({articles.length})</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-medium rounded hover:bg-muted-foreground transition-colors">
              <Plus className="h-4 w-4" />
              New Article
            </button>
          </div>

          {/* Articles table - scrollable container */}
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Published</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Featured</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground line-clamp-2 max-w-sm">
                        {article.title}
                      </div>
                      <p className="text-xs text-muted-foreground">{article.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium whitespace-nowrap">
                        {article.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {article.author.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                      {article.publishedAt}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          article.featured
                            ? "bg-green-100 text-green-900"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {article.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/edit/${article.id}`}
                          className="p-2 hover:bg-muted rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </Link>
                        <button
                          className="p-2 hover:bg-muted rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Info footer */}
          <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground bg-muted/20">
            Total: {articles.length} articles
          </div>
        </div>
      </div>
    </div>
  );
}
