import { useEffect } from "react";
import { Video, FileText, Trophy, Flame, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/StatsCard";
import { QuizHistoryItem } from "@/components/QuizHistoryItem";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { loadProfile, profileData, generatedVideos, quizAttempts, streak, notesDownloaded } = useApp();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const videos = profileData?.recentVideos || generatedVideos;
  const quizzes = profileData?.recentQuizzes || quizAttempts;
  const passRate = profileData?.passRate || 0;
  const passedQuizzes = profileData?.passedQuizzes || 0;

  if (!profileData && videos.length === 0) {
    return (
      <div className="min-h-full p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="text-muted-foreground mt-1">Track your learning progress and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Videos Generated"
            value={profileData?.videosGenerated || videos.length}
            subtitle="Total visualizations"
            icon={Video}
            variant="primary"
          />
          <StatsCard
            title="Notes Downloaded"
            value={notesDownloaded}
            icon={FileText}
            variant="default"
          />
          <StatsCard
            title="Quiz Pass Rate"
            value={`${passRate}%`}
            subtitle={`${passedQuizzes}/${quizzes.length} passed`}
            icon={Trophy}
            variant="success"
          />
          <StatsCard
            title="Learning Streak"
            value={`${streak} days`}
            icon={Flame}
            trend="up"
            trendValue="Active"
            variant="warning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Recent Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {videos.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No videos generated yet. Start by creating your first visualization!
                </p>
              ) : (
                videos.slice(0, 5).map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    data-testid={`video-history-${video.id}`}
                  >
                    <div className="w-16 h-10 rounded bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-primary/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{video.prompt}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(video.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      2:34
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Quiz History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quizzes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No quizzes taken yet. Generate a video and test your knowledge!
                </p>
              ) : (
                quizzes.slice(0, 5).map((quiz) => (
                  <QuizHistoryItem
                    key={quiz.id}
                    prompt={quiz.prompt}
                    score={quiz.score}
                    totalQuestions={quiz.totalQuestions}
                    date={new Date(quiz.createdAt)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Learning Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {Array.from({ length: 7 }).map((_, i) => {
                const isActive = i < streak % 7 || streak >= 7;
                return (
                  <div
                    key={i}
                    className={`flex-1 h-12 rounded-lg flex items-center justify-center font-medium text-sm ${
                      isActive
                        ? "bg-gradient-to-br from-orange-500/20 to-yellow-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </div>
                );
              })}
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Keep your streak going by learning something new every day!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
