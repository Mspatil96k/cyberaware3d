import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberBackground } from "@/components/CyberBackground";
import { ArrowLeft, Clock, Shield, BookOpen, ArrowRight } from "lucide-react";
import type { Article } from "@shared/schema";

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    enabled: !!slug,
  });

  const { data: relatedArticles } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  const related = relatedArticles?.filter(
    (a) => a.category === article?.category && a.slug !== slug
  ).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <CyberBackground />
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="space-y-6">
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            <div className="h-12 bg-muted animate-pulse rounded" />
            <div className="h-6 w-48 bg-muted animate-pulse rounded" />
            <div className="space-y-3">
              <div className="h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen">
        <CyberBackground />
        <div className="container mx-auto px-6 py-20 text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/learn">
            <Button className="gap-2" data-testid="button-back-to-articles">
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <Link href="/learn">
          <Button variant="ghost" className="gap-2 mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Button>
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">
                {article.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </Badge>
              <Badge variant="outline">{article.difficulty}</Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight" data-testid="text-article-title">
              {article.title}
            </h1>

            <p className="text-xl text-muted-foreground">{article.excerpt}</p>
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12">
            <div 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-relaxed prose-li:text-base"
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-testid="article-content"
            />
          </Card>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-chart-2/5 to-primary/5 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">Test Your Knowledge</h3>
                <p className="text-muted-foreground">
                  Ready to see how much you've learned? Take a quiz to test your understanding.
                </p>
              </div>
              <Link href="/quiz">
                <Button size="lg" className="gap-2" data-testid="button-take-quiz">
                  <Shield className="w-5 h-5" />
                  Take a Quiz
                </Button>
              </Link>
            </div>
          </Card>

          {/* Related Articles */}
          {related && related.length > 0 && (
            <div className="space-y-6 pt-8">
              <h2 className="text-2xl font-bold">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((relatedArticle) => (
                  <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`}>
                    <Card className="p-6 hover-elevate transition-all hover:-translate-y-1 cursor-pointer h-full" data-testid={`card-related-${relatedArticle.id}`}>
                      <div className="space-y-3">
                        <Badge variant="secondary" className="text-xs">
                          {relatedArticle.category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Badge>
                        <h3 className="font-semibold line-clamp-2">{relatedArticle.title}</h3>
                        <div className="flex items-center text-primary text-sm font-medium">
                          Read <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
