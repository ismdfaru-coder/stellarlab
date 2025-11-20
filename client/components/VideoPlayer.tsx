import { useState } from "react";
import { Play, X } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  posterImage?: string;
}

export function VideoPlayer({
  videoUrl,
  title,
  posterImage,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // Handle youtube.com/watch?v=ID
    const match1 = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    if (match1?.[1]) {
      return `https://www.youtube.com/embed/${match1[1]}?autoplay=1`;
    }

    // Handle youtube.com/embed/ID
    const match2 = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (match2?.[1]) {
      return `https://www.youtube.com/embed/${match2[1]}?autoplay=1`;
    }

    // Handle direct embed URLs
    if (url.includes("youtube.com/embed")) {
      return url.includes("autoplay=1") ? url : url + "?autoplay=1";
    }

    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  // Default poster if not provided
  const poster =
    posterImage ||
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&h=675&fit=crop";

  if (!embedUrl) {
    return (
      <div className="w-full bg-muted rounded-lg p-8 text-center border border-border">
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="relative w-full bg-black rounded-lg overflow-hidden">
        <div className="relative pt-[56.25%]">
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative w-full overflow-hidden rounded-lg bg-black cursor-pointer">
      {/* Poster image with aspect ratio */}
      <div className="relative pt-[56.25%]">
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-all duration-300 group-hover:from-black/90 group-hover:via-black/50" />

        {/* Play button - Narratively style */}
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          aria-label={`Play video: ${title}`}
        >
          <div className="relative flex items-center justify-center">
            {/* Outer ring animation */}
            <div className="absolute w-24 h-24 border-2 border-white/50 rounded-full group-hover:border-white/80 transition-colors" />

            {/* Play icon - large and prominent */}
            <div className="relative w-20 h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full group-hover:bg-white/20 transition-all duration-300">
              <Play className="h-10 w-10 text-white fill-white ml-1" />
            </div>

            {/* Hover effect - expanding circles */}
            <div className="absolute w-24 h-24 border border-white/20 rounded-full group-hover:scale-125 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
        </button>

        {/* Time badge (if you want to show duration) */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-mono text-white flex items-center gap-2">
          <span className="text-white/70">Play Video</span>
        </div>
      </div>

      {/* Video info - shows when not playing */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <p className="text-sm font-light text-white/90">Featured Video</p>
      </div>
    </div>
  );
}
