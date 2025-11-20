import { useState } from "react";
import { X, Facebook, Linkedin, MessageCircle, Mail, Share2 } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter/X",
      icon: () => (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.654l-5.207-6.807-5.974 6.807H2.306l7.644-8.744L2.25 2.25h6.814l4.707 6.225 5.467-6.225zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:text-black",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:text-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${url}`,
      color: "hover:text-gray-600",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border border-border rounded-lg shadow-xl max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Share This Story</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="p-6 space-y-4">
            {/* Social Icons Grid */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {shareLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-foreground transition-all ${link.color}`}
                    title={`Share on ${link.name}`}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="text-xs text-center text-muted-foreground group-hover:text-foreground">
                      {link.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Copy Link Section */}
            <div className="border-t border-border pt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Copy Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 px-3 py-2 border border-border bg-muted text-foreground text-sm rounded"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-foreground text-background font-medium text-sm rounded hover:bg-muted-foreground transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
