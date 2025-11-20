import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple authentication - in production, this would be an API call
    // For now, accept admin/admin as credentials
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminToken", "authenticated");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-foreground rounded-lg">
              <Lock className="h-8 w-8 text-background" />
            </div>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-2">Admin Access</h1>
          <p className="text-muted-foreground">Sign in to manage your content</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg text-center">
          <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
          <p className="text-xs font-mono text-foreground">
            Username: <span className="font-semibold">admin</span>
          </p>
          <p className="text-xs font-mono text-foreground">
            Password: <span className="font-semibold">admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
