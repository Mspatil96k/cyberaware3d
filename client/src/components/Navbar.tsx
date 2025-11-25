import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Brain, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [location] = useLocation();
  const { isAuthenticated, user, isLoading } = useAuth();

  const navItems = isAuthenticated ? [
    { path: "/", label: "Home", icon: Shield },
    { path: "/learn", label: "Learn", icon: BookOpen },
    { path: "/quiz", label: "Quiz", icon: Brain },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ] : [
    { path: "/", label: "Home", icon: Shield },
    { path: "/learn", label: "Learn", icon: BookOpen },
    { path: "/quiz", label: "Quiz", icon: Brain },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <button className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-all" data-testid="link-home">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">CyberShield</span>
          </button>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className="gap-2"
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} className="object-cover" />
                  <AvatarFallback className="text-sm">
                    {user.firstName?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{user.firstName || user.email}</span>
              </div>
              <a href="/api/logout">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-logout">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </a>
            </div>
          ) : (
            <a href="/api/login">
              <Button variant="default" data-testid="button-login">
                Get Started
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
