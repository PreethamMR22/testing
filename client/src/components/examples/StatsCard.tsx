import { StatsCard } from "../StatsCard";
import { Video, FileText, Trophy, Flame } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      <StatsCard
        title="Videos Generated"
        value={12}
        subtitle="This month"
        icon={Video}
        trend="up"
        trendValue="3"
        variant="primary"
      />
      <StatsCard
        title="Notes Downloaded"
        value={8}
        icon={FileText}
        variant="default"
      />
      <StatsCard
        title="Quizzes Passed"
        value="85%"
        subtitle="Average score"
        icon={Trophy}
        variant="success"
      />
      <StatsCard
        title="Learning Streak"
        value="7 days"
        icon={Flame}
        trend="up"
        trendValue="2 days"
        variant="warning"
      />
    </div>
  );
}
