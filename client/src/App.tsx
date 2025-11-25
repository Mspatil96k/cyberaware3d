import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChat } from "@/components/AIChat";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import ArticleDetail from "@/pages/ArticleDetail";
import QuizPage from "@/pages/Quiz";
import Dashboard from "@/pages/Dashboard";
import Resources from "@/pages/Resources";
import IncidentReport from "@/pages/IncidentReport";
import Admin from "@/pages/Admin";
import Leaderboard from "@/pages/Leaderboard";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={isLoading ? () => null : isAuthenticated ? Home : Landing} />
          <Route path="/learn" component={Learn} />
          <Route path="/article/:slug" component={ArticleDetail} />
          <Route path="/quiz" component={QuizPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/resources" component={Resources} />
          <Route path="/report-incident" component={IncidentReport} />
          <Route path="/admin" component={Admin} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
