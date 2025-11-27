import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizCard } from "@/components/QuizCard";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

function generateQuestions(prompt: string): Question[] {
  const topic = prompt.replace(/^visualize\s+/i, "").replace(/^the\s+/i, "");
  
  return [
    {
      id: "q1",
      question: `What is the primary principle behind ${topic}?`,
      options: [
        { id: "a", text: "A change in wave properties due to relative motion" },
        { id: "b", text: "The reflection of energy from a surface" },
        { id: "c", text: "The absorption of particles by matter" },
        { id: "d", text: "Static equilibrium of forces" },
      ],
      correctAnswer: "a",
    },
    {
      id: "q2",
      question: `In which field is ${topic} most commonly observed?`,
      options: [
        { id: "a", text: "Architecture and construction" },
        { id: "b", text: "Physics and astronomy" },
        { id: "c", text: "Literature and arts" },
        { id: "d", text: "Agriculture" },
      ],
      correctAnswer: "b",
    },
    {
      id: "q3",
      question: `What happens when the source of ${topic} moves toward an observer?`,
      options: [
        { id: "a", text: "The effect becomes weaker" },
        { id: "b", text: "Nothing changes" },
        { id: "c", text: "The frequency appears higher" },
        { id: "d", text: "The phenomenon stops" },
      ],
      correctAnswer: "c",
    },
    {
      id: "q4",
      question: `Which of these is a real-world application of ${topic}?`,
      options: [
        { id: "a", text: "Cooking food" },
        { id: "b", text: "Radar speed detection" },
        { id: "c", text: "Printing documents" },
        { id: "d", text: "Writing software" },
      ],
      correctAnswer: "b",
    },
    {
      id: "q5",
      question: `Who is credited with discovering or describing ${topic}?`,
      options: [
        { id: "a", text: "Albert Einstein" },
        { id: "b", text: "Isaac Newton" },
        { id: "c", text: "Christian Doppler" },
        { id: "d", text: "Galileo Galilei" },
      ],
      correctAnswer: "c",
    },
  ];
}

export default function Quiz() {
  const { currentPrompt, submitQuiz } = useApp();
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const prompt = currentPrompt || "Doppler Effect";
  const questions = useMemo(() => generateQuestions(prompt), [prompt]);
  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const score = questions.filter(
        (q) => answers[q.id] === q.correctAnswer
      ).length;
      
      const response = await submitQuiz(prompt, score, questions.length);
      setResult(response);
      setSubmitted(true);
      
      toast({
        title: response.passed ? "Quiz Passed!" : "Quiz Complete",
        description: response.message,
      });
    } catch (error) {
      toast({
        title: "Failed to submit quiz",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setResult(null);
  };

  const score = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
  const passed = score >= 3;
  const allAnswered = Object.keys(answers).length === questions.length;

  if (submitted && result) {
    return (
      <div className="min-h-full flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div
              className={cn(
                "w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6",
                passed ? "bg-green-500/10" : "bg-red-500/10"
              )}
            >
              {passed ? (
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              )}
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              {result.passed ? "Congratulations, You Passed!" : "Keep Learning!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {result.message}
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-4xl font-bold">{score}</span>
              <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
            </div>

            <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  passed ? "bg-green-500" : "bg-red-500"
                )}
                style={{ width: `${(score / questions.length) * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={handleRetry} variant="outline" data-testid="button-retry-quiz">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={() => setLocation("/")} data-testid="button-go-home">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-full p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4"
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            Quiz: {prompt}
          </h1>
          <p className="text-muted-foreground mt-1">
            Answer all questions and score at least 3/5 to pass
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="sr-only">Question {currentIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <QuizCard
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              selectedAnswer={answers[currentQuestion.id] || null}
              onSelect={handleSelect}
            />

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                data-testid="button-prev-question"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {Object.keys(answers).length} of {questions.length} answered
              </div>

              {currentIndex === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  data-testid="button-submit-quiz"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button onClick={handleNext} data-testid="button-next-question">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
