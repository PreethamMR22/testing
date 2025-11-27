import { Check, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuizHistoryItemProps {
  prompt: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

export function QuizHistoryItem({
  prompt,
  score,
  totalQuestions,
  date,
}: QuizHistoryItemProps) {
  const passed = score >= Math.ceil(totalQuestions * 0.6);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
      data-testid={`quiz-history-${prompt.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
          passed ? "bg-green-500/10" : "bg-red-500/10"
        )}
      >
        {passed ? (
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
        ) : (
          <X className="w-5 h-5 text-red-600 dark:text-red-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{prompt}</h4>
        <div className="flex items-center gap-2 mt-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-lg font-bold">
            {score}/{totalQuestions}
          </p>
          <p className="text-xs text-muted-foreground">{percentage}%</p>
        </div>
        <Badge
          variant={passed ? "default" : "secondary"}
          className={cn(
            passed
              ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
              : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
          )}
        >
          {passed ? "Passed" : "Failed"}
        </Badge>
      </div>
    </div>
  );
}
