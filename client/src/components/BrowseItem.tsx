import { ExternalLink, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BrowseItemProps {
  title: string;
  description: string;
  duration: string;
  category: string;
  views: string;
  url: string;
}

export function BrowseItem({
  title,
  description,
  duration,
  category,
  views,
  url,
}: BrowseItemProps) {
  const handleClick = () => {
    console.log(`Opening video: ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left group hover-elevate rounded-xl p-4 border border-border bg-card transition-all"
      data-testid={`browse-item-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-40 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            <PlayCircle className="w-10 h-10 text-primary/60 group-hover:scale-110 transition-transform" />
          </div>
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {duration}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">{views} views</span>
          </div>
        </div>
      </div>
    </button>
  );
}
