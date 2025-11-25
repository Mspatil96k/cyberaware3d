import { Shield, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">CyberShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering users with cybersecurity awareness through interactive learning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/learn">
                  <button className="hover:text-primary transition-colors" data-testid="footer-link-learn">Learn</button>
                </Link>
              </li>
              <li>
                <Link href="/quiz">
                  <button className="hover:text-primary transition-colors" data-testid="footer-link-quiz">Take Quiz</button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <button className="hover:text-primary transition-colors" data-testid="footer-link-dashboard">Dashboard</button>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-primary transition-colors">Security Tips</button></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Connect</h3>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-md border border-border hover-elevate active-elevate-2 flex items-center justify-center" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-md border border-border hover-elevate active-elevate-2 flex items-center justify-center" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-md border border-border hover-elevate active-elevate-2 flex items-center justify-center" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CyberShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
