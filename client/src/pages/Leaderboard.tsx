import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberBackground } from "@/components/CyberBackground";
import { Trophy, TrendingUp, Award } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  firstName: string;
  email: string;
  totalScore: number;
  quizCount: number;
  averageScore: number;
  badges: number;
}

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-medium">Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top cybersecurity enthusiasts based on quiz performance and badges earned
          </p>
        </div>

        {/* Leaderboard Table */}
        <Card className="p-8 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : leaderboard && leaderboard.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Rank</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">User</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm text-muted-foreground">Quizzes</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm text-muted-foreground">Avg Score</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm text-muted-foreground">Badges</th>
                  <th className="text-center py-4 px-4 font-semibold text-sm text-muted-foreground">Total Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className="border-b border-border/50 hover-elevate transition-all">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                        {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                        {index === 2 && <Trophy className="w-5 h-5 text-orange-600" />}
                        {index > 2 && <span className="text-sm font-semibold">{index + 1}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold">{entry.firstName || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground truncate">{entry.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="outline">{entry.quizCount}</Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{entry.averageScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge className="bg-primary/10 text-primary">{entry.badges}</Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-lg text-primary">{entry.totalScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No leaderboard data yet. Be the first to earn a spot!</p>
            </div>
          )}
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <p className="text-sm text-muted-foreground">Top Score</p>
            <p className="text-3xl font-bold mt-2">{leaderboard?.[0]?.totalScore || 0}</p>
          </Card>
          <Card className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-primary" />
            <p className="text-sm text-muted-foreground">Active Users</p>
            <p className="text-3xl font-bold mt-2">{leaderboard?.length || 0}</p>
          </Card>
          <Card className="p-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-3 text-chart-1" />
            <p className="text-sm text-muted-foreground">Badges Available</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
