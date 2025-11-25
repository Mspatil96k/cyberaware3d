import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CyberBackground } from "@/components/CyberBackground";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin
        ? { username: email, password }
        : { email, firstName: firstName || email.split("@")[0], password };

      const response = await apiRequest("POST", endpoint, body);

      if (response.user) {
        toast({
          title: isLogin ? "Login successful" : "Registration successful",
          description: isLogin ? "Welcome back!" : "Your account has been created",
        });
        // Reload page to update auth state
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">CyberShield</h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Login to your account" : "Create a new account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name (Optional)</label>
                <Input
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  data-testid="input-firstname"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
              data-testid="button-toggle-auth"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
            <p className="font-medium">Demo Credentials:</p>
            <p>Email: <code className="bg-muted px-1.5 py-0.5 rounded">test@example.com</code></p>
            <p>Password: <code className="bg-muted px-1.5 py-0.5 rounded">test123</code></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
