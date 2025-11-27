import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VideoPlaceholderProps {
  isGenerating?: boolean;
  hasVideo?: boolean;
  prompt?: string;
  onWatchAgain?: () => void;
}

export function VideoPlaceholder({
  isGenerating = false,
  hasVideo = false,
  prompt,
  onWatchAgain,
}: VideoPlaceholderProps) {
  return (
    <div className="relative w-full" data-testid="video-placeholder-container">
      <div className="aspect-video w-full rounded-xl overflow-hidden border border-border bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {isGenerating ? (
            <>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                </div>
              </div>
              <div className="text-center px-4">
                <p className="text-lg font-semibold text-foreground">Generating Animation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Creating visualization for "{prompt}"
                </p>
              </div>
              <div className="flex gap-1 mt-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </>
          ) : hasVideo ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover-elevate cursor-pointer">
                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <p className="text-white text-sm font-medium truncate max-w-[200px]">
                    {prompt}
                  </p>
                </div>
                {onWatchAgain && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={onWatchAgain}
                    className="bg-white/90 hover:bg-white text-foreground"
                    data-testid="button-watch-again"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Watch Again
                  </Button>
                )}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                <span className="text-white text-xs font-mono">2:34</span>
              </div>
            </>
          ) : (
            <>
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-muted to-muted/50 border-2 border-dashed border-muted-foreground/30"
              )}>
                <Play className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <div className="text-center px-4">
                <p className="text-muted-foreground">Enter a prompt to generate a visualization</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  e.g., "Visualize the Doppler effect"
                </p>
              </div>
            </>
          )}
        </div>
        
        {!isGenerating && !hasVideo && (
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
