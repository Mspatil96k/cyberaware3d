import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Brain, BookOpen, TrendingUp, Lock, Eye, UserCheck, Zap } from "lucide-react";
import { CyberBackground } from "@/components/CyberBackground";
import { Link } from "wouter";

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Articles",
      description: "Learn cybersecurity fundamentals through easy-to-understand articles",
    },
    {
      icon: Brain,
      title: "Knowledge Quizzes",
      description: "Test your understanding with interactive quizzes and track progress",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
    },
    {
      icon: Shield,
      title: "Stay Protected",
      description: "Learn to identify and prevent common cyber threats",
    },
  ];

  const stats = [
    { value: "10+", label: "Security Topics" },
    { value: "50+", label: "Quiz Questions" },
    { value: "100%", label: "Free Access" },
  ];

  return (
    <div className="min-h-screen">
      <CyberBackground />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-medium">Cybersecurity Awareness Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Master
              <span className="block text-primary mt-2">Cybersecurity</span>
              Fundamentals
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Protect yourself and your organization from cyber threats. Learn through interactive articles, take quizzes, and build security awareness.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/api/login">
                <Button size="lg" className="gap-2 text-base" data-testid="button-get-started">
                  <Shield className="w-5 h-5" />
                  Get Started Free
                </Button>
              </a>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="gap-2 text-base" data-testid="button-browse-articles">
                  <BookOpen className="w-5 h-5" />
                  Browse Articles
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - 3D Visual */}
          <div className="relative">
            <div className="cyber-shield-container">
              <div className="cyber-shield">
                <div className="shield-layer shield-layer-1">
                  <Shield className="w-32 h-32 text-primary" />
                </div>
                <div className="shield-layer shield-layer-2">
                  <Shield className="w-32 h-32 text-chart-2" />
                </div>
                <div className="shield-layer shield-layer-3">
                  <Shield className="w-32 h-32 text-primary/30" />
                </div>
              </div>
              <div className="cyber-rings">
                <div className="cyber-ring cyber-ring-1"></div>
                <div className="cyber-ring cyber-ring-2"></div>
                <div className="cyber-ring cyber-ring-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose CyberShield?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build strong cybersecurity awareness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover-elevate transition-all hover:-translate-y-1" data-testid={`card-feature-${index}`}>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Topics Preview */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">What You'll Learn</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Essential cybersecurity topics to protect yourself online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: "Password Security", color: "text-chart-1" },
            { icon: Eye, title: "Phishing Detection", color: "text-chart-2" },
            { icon: Shield, title: "Malware Protection", color: "text-chart-3" },
            { icon: UserCheck, title: "Social Engineering", color: "text-chart-4" },
            { icon: BookOpen, title: "Safe Browsing", color: "text-chart-5" },
            { icon: Lock, title: "Data Privacy", color: "text-primary" },
          ].map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-6 rounded-lg border border-border hover-elevate transition-all"
                data-testid={`topic-${index}`}
              >
                <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center ${topic.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{topic.title}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 md:p-16 text-center space-y-6 bg-gradient-to-br from-primary/10 via-chart-2/5 to-primary/5 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users building their cybersecurity awareness
          </p>
          <a href="/api/login">
            <Button size="lg" className="gap-2 text-base" data-testid="button-cta-start">
              <Shield className="w-5 h-5" />
              Start Learning Now
            </Button>
          </a>
        </Card>
      </section>
    </div>
  );
}
