import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CyberBackground } from "@/components/CyberBackground";
import { Trophy, Brain, TrendingUp, Clock, Calendar, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { QuizAttempt } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: attempts, isLoading: attemptsLoading } = useQuery<QuizAttempt[]>({
    queryKey: ["/api/quiz-attempts"],
    enabled: isAuthenticated && !isLoading,
  });

  const { data: suggestedQuiz } = useQuery({
    queryKey: ["/api/quiz/suggested"],
    enabled: isAuthenticated && !isLoading,
  });

  if (isLoading || attemptsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CyberBackground />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" data-testid="loading-spinner" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalQuizzes = attempts?.length || 0;
  const averageScore = totalQuizzes > 0
    ? Math.round(attempts!.reduce((sum, a) => sum + a.score, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0
    ? Math.max(...attempts!.map(a => a.score))
    : 0;
  const recentAttempts = attempts?.slice(0, 5) || [];

  const stats = [
    {
      icon: Brain,
      label: "Quizzes Completed",
      value: totalQuizzes,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      icon: TrendingUp,
      label: "Average Score",
      value: `${averageScore}%`,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      icon: Trophy,
      label: "Best Score",
      value: `${bestScore}%`,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold" data-testid="text-dashboard-title">
            Your Learning Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress and view your quiz history
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold" data-testid={`stat-${index}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quiz History */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Quiz Attempts</h2>

          {recentAttempts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No quizzes taken yet</h3>
              <p className="text-muted-foreground mb-6">
                Start testing your knowledge by taking your first quiz!
              </p>
              <a href="/quiz">
                <button className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-md bg-primary text-primary-foreground hover-elevate active-elevate-2 font-medium" data-testid="button-take-first-quiz">
                  Take Your First Quiz
                </button>
              </a>
            </Card>
          ) : (
            <div className="space-y-4">
              {recentAttempts.map((attempt) => {
                const date = new Date(attempt.completedAt);
                const isPerfect = attempt.score === 100;
                const isGood = attempt.score >= 70;

                return (
                  <Card key={attempt.id} className="p-6 hover-elevate transition-all" data-testid={`attempt-${attempt.id}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isPerfect ? "bg-chart-2/20" : isGood ? "bg-primary/20" : "bg-chart-4/20"
                        }`}>
                          <Trophy className={`w-6 h-6 ${
                            isPerfect ? "text-chart-2" : isGood ? "text-primary" : "text-chart-4"
                          }`} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold">Quiz Completed</h3>
                            <Badge variant={isPerfect ? "default" : isGood ? "secondary" : "outline"}>
                              {attempt.score}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {date.toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{attempt.score}%</p>
                          <p className="text-xs text-muted-foreground">
                            {isPerfect ? "Perfect!" : isGood ? "Great job!" : "Keep learning"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Suggested Quiz */}
        {suggestedQuiz && (
          <Card className="p-8 bg-gradient-to-r from-primary/20 to-chart-2/20 border border-primary/30">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">Recommended For You</span>
                </div>
                <h3 className="text-2xl font-bold">{suggestedQuiz.title}</h3>
                <p className="text-muted-foreground">
                  Based on your performance, we recommend this {suggestedQuiz.difficulty} level quiz.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" data-testid="badge-category">{suggestedQuiz.category}</Badge>
                  <Badge variant="outline" data-testid="badge-difficulty">{suggestedQuiz.difficulty}</Badge>
                </div>
              </div>
              <Link href="/quiz">
                <Button size="lg" className="gap-2" data-testid="button-suggested-quiz">
                  <Brain className="w-5 h-5" />
                  Start Quiz
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Progress Card */}
        {totalQuizzes > 0 && (
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-chart-2/5 to-primary/5 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Average</span>
                    <span className="font-semibold">{averageScore}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-background/50 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${averageScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {averageScore >= 80
                    ? "Excellent work! You're mastering cybersecurity concepts."
                    : averageScore >= 60
                    ? "Good progress! Keep learning to improve your score."
                    : "Keep practicing! Review articles and retake quizzes to improve."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Next Steps</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Review articles in your weaker areas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Take more quizzes to improve your average</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Check the leaderboard and compete with others</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
