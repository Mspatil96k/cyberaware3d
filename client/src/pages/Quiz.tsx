import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CyberBackground } from "@/components/CyberBackground";
import { Brain, CheckCircle2, XCircle, Trophy, RefreshCw, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import type { Quiz } from "@shared/schema";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function QuizPage() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const { data: quiz, isLoading, refetch } = useQuery<Quiz>({
    queryKey: ["/api/quizzes/random"],
    retry: 1,
  });

  const questions: QuizQuestion[] = quiz?.questions as QuizQuestion[] || [];

  const submitMutation = useMutation({
    mutationFn: async (answers: number[]) => {
      const correctCount = answers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
      const scorePercent = Math.round((correctCount / questions.length) * 100);

      if (isAuthenticated) {
        await apiRequest("POST", "/api/quiz-attempts", {
          quizId: quiz!.id,
          answers,
          score: scorePercent,
        });
      }

      return { score: scorePercent, correctCount };
    },
    onSuccess: ({ score }) => {
      setScore(score);
      setShowResults(true);
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ["/api/quiz-attempts/recent"] });
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setUserAnswers([...userAnswers, selectedAnswer]);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        submitMutation.mutate([...userAnswers, selectedAnswer]);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
    refetch();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CyberBackground />
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen">
        <CyberBackground />
        <div className="container mx-auto px-6 py-20 text-center">
          <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No quizzes available</h1>
          <p className="text-muted-foreground mb-6">Please check back later.</p>
          <Link href="/">
            <Button data-testid="button-go-home">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (showResults) {
    const correctCount = userAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const isPerfect = score === 100;
    const isGood = score >= 70;

    return (
      <div className="min-h-screen">
        <CyberBackground />
        <div className="container mx-auto px-6 py-12 max-w-3xl">
          <Card className="p-8 md:p-12 text-center space-y-6">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
              isPerfect ? "bg-chart-2/20" : isGood ? "bg-primary/20" : "bg-chart-4/20"
            }`}>
              <Trophy className={`w-12 h-12 ${
                isPerfect ? "text-chart-2" : isGood ? "text-primary" : "text-chart-4"
              }`} />
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold" data-testid="text-quiz-score">
                {isPerfect ? "Perfect Score!" : isGood ? "Great Job!" : "Keep Practicing!"}
              </h1>
              <p className="text-3xl font-bold text-primary">{score}%</p>
              <p className="text-muted-foreground">
                You got {correctCount} out of {questions.length} questions correct
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <h2 className="text-xl font-semibold text-left">Review Answers</h2>
              {questions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.correctAnswer;
                return (
                  <Card key={idx} className="p-6 text-left">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-chart-2 flex-shrink-0 mt-1" />
                        ) : (
                          <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.question}</p>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="text-muted-foreground">Your answer:</span>{" "}
                              <span className={isCorrect ? "text-chart-2" : "text-destructive"}>
                                {q.options[userAnswers[idx]]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Correct answer:</span>{" "}
                                <span className="text-chart-2">{q.options[q.correctAnswer]}</span>
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground italic">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="gap-2" onClick={handleRetry} data-testid="button-retry-quiz">
                <RefreshCw className="w-5 h-5" />
                Try Another Quiz
              </Button>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="gap-2 w-full" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen">
      <CyberBackground />

      <div className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-2">
              <Brain className="w-4 h-4" />
              {quiz.category}
            </Badge>
            <Badge variant="outline">{quiz.difficulty}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 md:p-12 space-y-8">
          <h2 className="text-2xl font-bold" data-testid="text-question">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                  selectedAnswer === idx
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                data-testid={`option-${idx}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswer === idx ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {selectedAnswer === idx && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              size="lg"
              onClick={handleNext}
              disabled={selectedAnswer === null || submitMutation.isPending}
              className="gap-2"
              data-testid="button-next"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  {submitMutation.isPending ? "Submitting..." : "Submit Quiz"}
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
