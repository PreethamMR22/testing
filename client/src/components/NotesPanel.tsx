import { useState } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NotesPanelProps {
  notes: string;
  prompt?: string;
  onDownload?: () => void;
}

export function NotesPanel({ notes, prompt, onDownload }: NotesPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  const handleDownload = () => {
    const blob = new Blob([notes], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notes-${prompt?.replace(/\s+/g, "-").toLowerCase() || "visualization"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    if (onDownload) {
      onDownload();
    }
    
    toast({
      title: "Notes Downloaded",
      description: "Your notes have been saved as a markdown file.",
    });
  };

  return (
    <Card className="w-full" data-testid="notes-panel">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CollapsibleTrigger asChild>
              <button
                className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1 -ml-2"
                data-testid="button-toggle-notes"
              >
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Generated Notes</CardTitle>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
            </CollapsibleTrigger>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              data-testid="button-download-notes"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="prose prose-sm dark:prose-invert max-w-none max-h-80 overflow-y-auto rounded-lg bg-muted/50 p-4">
              {notes.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return <h1 key={i} className="text-xl font-bold mt-0 mb-3">{line.slice(2)}</h1>;
                }
                if (line.startsWith("## ")) {
                  return <h2 key={i} className="text-lg font-semibold mt-4 mb-2">{line.slice(3)}</h2>;
                }
                if (line.startsWith("### ")) {
                  return <h3 key={i} className="text-base font-medium mt-3 mb-1">{line.slice(4)}</h3>;
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="ml-4 text-muted-foreground">{line.slice(2)}</li>;
                }
                if (line.match(/^\d+\./)) {
                  return <li key={i} className="ml-4 text-muted-foreground list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
                }
                if (line.trim() === "") {
                  return <div key={i} className="h-2" />;
                }
                return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
              })}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
