import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CyberBackground } from "@/components/CyberBackground";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, FileText, Brain, Activity, Lock } from "lucide-react";
import { Link } from "wouter";

export default function Admin() {
  const { isAuthenticated, user } = useAuth();
  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center space-y-4">
          <Lock className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">Admin panel is restricted.</p>
        </Card>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md text-center space-y-4">
          <Lock className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage content, users, and analytics</p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold" data-testid="stat-users">
                    {stats.totalUsers || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Articles</p>
                  <p className="text-3xl font-bold" data-testid="stat-articles">
                    {stats.totalArticles || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-chart-1" />
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                  <p className="text-3xl font-bold" data-testid="stat-quizzes">
                    {stats.totalQuizzes || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-chart-2" />
                </div>
              </div>
            </Card>

            <Card className="p-6 hover-elevate transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Active Today</p>
                  <p className="text-3xl font-bold" data-testid="stat-active">
                    {stats.activeToday || 0}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-chart-3" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Content Management */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Articles Management</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">Manage educational content and cybersecurity articles.</p>
              <div className="flex gap-3">
                <Link href="/admin/articles">
                  <Button variant="outline" data-testid="button-manage-articles">
                    Manage Articles
                  </Button>
                </Link>
                <Link href="/admin/articles/new">
                  <Button data-testid="button-create-article">
                    Create New
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Quizzes Management</h2>
            <div className="space-y-3">
              <p className="text-muted-foreground">Manage quizzes and assessment questions.</p>
              <div className="flex gap-3">
                <Link href="/admin/quizzes">
                  <Button variant="outline" data-testid="button-manage-quizzes">
                    Manage Quizzes
                  </Button>
                </Link>
                <Link href="/admin/quizzes/new">
                  <Button data-testid="button-create-quiz">
                    Create New
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* User Analytics */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">User Analytics</h2>
          <Link href="/admin/analytics">
            <Button data-testid="button-view-analytics">
              View Detailed Analytics
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
