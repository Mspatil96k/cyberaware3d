import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CyberBackground } from "@/components/CyberBackground";
import { Search, Clock, BookOpen, Shield, Lock, Eye, Users, Globe, Database, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Article } from "@shared/schema";

const categoryIcons: Record<string, any> = {
  phishing: Eye,
  malware: Shield,
  passwords: Lock,
  "safe-browsing": Globe,
  "data-privacy": Database,
  "social-engineering": Users,
};

const categoryColors: Record<string, string> = {
  phishing: "text-chart-1",
  malware: "text-chart-2",
  passwords: "text-chart-3",
  "safe-browsing": "text-chart-4",
  "data-privacy": "text-chart-5",
  "social-engineering": "text-primary",
};

export default function Learn() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const filteredArticles = articles?.filter((article) => {
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || article.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = articles
    ? Array.from(new Set(articles.map((a) => a.category)))
    : [];

  const difficulties = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-medium">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Cybersecurity Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn essential cybersecurity concepts through our comprehensive article library
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
              data-testid="input-search-articles"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              data-testid="filter-category-all"
            >
              All Topics
            </Button>
            {categories.map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="gap-2"
                  data-testid={`filter-category-${category}`}
                >
                  <Icon className="w-4 h-4" />
                  {category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </Button>
              );
            })}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-muted-foreground self-center">Difficulty:</span>
            <Button
              variant={selectedDifficulty === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedDifficulty(null)}
              data-testid="filter-difficulty-all"
            >
              All
            </Button>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                data-testid={`filter-difficulty-${difficulty}`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 space-y-4">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-6 bg-muted animate-pulse rounded" />
                <div className="h-16 bg-muted animate-pulse rounded" />
              </Card>
            ))}
          </div>
        ) : filteredArticles && filteredArticles.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground text-center">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const CategoryIcon = categoryIcons[article.category] || BookOpen;
                const categoryColor = categoryColors[article.category] || "text-primary";
                
                return (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <Card className="p-6 hover-elevate transition-all hover:-translate-y-1 cursor-pointer h-full flex flex-col" data-testid={`card-article-${article.id}`}>
                      <div className="space-y-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center ${categoryColor}`}>
                          <CategoryIcon className="w-6 h-6" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                              {article.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {article.difficulty}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold line-clamp-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {article.readTime} min read
                        </div>
                        <div className="flex items-center text-primary text-sm font-medium">
                          Read <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
