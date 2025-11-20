import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsProps {
  articleSlug: string;
}

export function Comments({ articleSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Mitchell",
      email: "sarah@example.com",
      content:
        "This article really resonates with me. The insights about sustainable consumption are eye-opening and practical.",
      timestamp: "2 days ago",
      replies: [
        {
          id: "1-1",
          author: "Alex Johnson",
          email: "alex@example.com",
          content:
            "Great point! I've been trying to implement these changes in my own life.",
          timestamp: "1 day ago",
        },
      ],
    },
    {
      id: "2",
      author: "Marcus Chen",
      email: "marcus@example.com",
      content:
        "Excellent deep dive into modern consumption patterns. Would love to see more on the generational differences.",
      timestamp: "1 day ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      return;
    }

    setIsSubmitting(true);

    const comment: Comment = {
      id: `${Date.now()}`,
      author: authorName,
      email: authorEmail,
      content: newComment,
      timestamp: "just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setAuthorName("");
    setAuthorEmail("");
    setIsSubmitting(false);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? "ml-8 mt-4" : "mb-8"}`}>
      <div className={`p-6 ${isReply ? "bg-muted/30" : "bg-muted/50"} border border-border rounded-lg`}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-foreground">{comment.author}</h4>
            <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
          </div>
        </div>
        <p className="text-foreground leading-relaxed">{comment.content}</p>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-0">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16 border-t border-border">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-6 w-6 text-foreground" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Thoughts
            </h2>
          </div>
          <p className="text-muted-foreground">
            Join the conversation. Share your thoughts and insights about this article.
          </p>
        </div>

        {/* Comment form */}
        <form onSubmit={handleSubmitComment} className="mb-12 p-6 bg-muted/30 border border-border rounded-lg">
          <h3 className="font-semibold text-foreground mb-4">Leave your comment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={4}
              className="w-full px-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-foreground resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Comments list */}
        <div>
          <h3 className="font-semibold text-foreground mb-6">
            {comments.length} Comment{comments.length !== 1 ? "s" : ""}
          </h3>
          <div className="space-y-0">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
