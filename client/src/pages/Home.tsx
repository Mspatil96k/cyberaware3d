import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, BookOpen, Trophy, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { QuizAttempt, Article } from "@shared/schema";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: recentAttempts } = useQuery<QuizAttempt[]>({
    queryKey: ["/api/quiz-attempts/recent"],
    enabled: isAuthenticated && !isLoading,
  });

  const { data: articles } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    enabled: !isLoading,
  });

  const quickActions = [
    {
      icon: BookOpen,
      title: "Continue Learning",
      description: "Explore cybersecurity articles",
      href: "/learn",
      color: "text-chart-1",
      testId: "card-continue-learning",
    },
    {
      icon: Brain,
      title: "Take a Quiz",
      description: "Test your knowledge",
      href: "/quiz",
      color: "text-chart-2",
      testId: "card-take-quiz",
    },
    {
      icon: Trophy,
      title: "View Progress",
      description: "Check your dashboard",
      href: "/dashboard",
      color: "text-chart-4",
      testId: "card-view-progress",
    },
  ];

  const averageScore = recentAttempts && recentAttempts.length > 0
    ? Math.round(recentAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / recentAttempts.length)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" data-testid="loading-spinner" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Welcome Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-welcome">
                Welcome back, {user?.firstName || user?.email}!
              </h1>
              <p className="text-muted-foreground">Continue your cybersecurity learning journey</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {recentAttempts && recentAttempts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                  <p className="text-3xl font-bold" data-testid="text-quizzes-completed">{recentAttempts.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-chart-1" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold" data-testid="text-average-score">{averageScore}%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="text-3xl font-bold" data-testid="text-best-score">
                    {Math.max(...recentAttempts.map(a => a.score))}%
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-chart-4" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.href}>
                  <Card className="p-6 hover-elevate transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid={action.testId}>
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg bg-card flex items-center justify-center ${action.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                        <p className="text-muted-foreground">{action.description}</p>
                      </div>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Get Started <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Articles */}
        {articles && articles.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recommended Articles</h2>
              <Link href="/learn">
                <Button variant="ghost" className="gap-2" data-testid="button-view-all-articles">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <Card className="p-6 hover-elevate transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid={`card-article-${article.id}`}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{article.readTime} min read</span>
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Motivation Card */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-chart-2/5 to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Keep Learning!</h3>
              <p className="text-muted-foreground">
                Cybersecurity is an ongoing journey. Take a quiz or read an article today to strengthen your digital defense.
              </p>
            </div>
            <Link href="/quiz">
              <Button size="lg" className="gap-2" data-testid="button-take-quiz">
                <Brain className="w-5 h-5" />
                Take Quiz
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
