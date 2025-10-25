import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { OperationType } from "@/types/quiz";
import { generateQuestion, getOperationSymbol, getOperationEmoji, updateStats } from "@/utils/quizHelpers";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";

interface QuizProps {
  operation: OperationType;
}

const Quiz = ({ operation }: QuizProps) => {
  const [question, setQuestion] = useState(generateQuestion(operation));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setQuestion(generateQuestion(operation));
    setUserAnswer("");
    setFeedback(null);
  }, [operation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = parseInt(userAnswer);
    
    if (isNaN(answer)) {
      toast.error("Please enter a valid number!");
      return;
    }

    const isCorrect = answer === question.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    updateStats(operation, isCorrect);

    if (isCorrect) {
      setStreak(prev => prev + 1);
      toast.success("🎉 Correct! Well done!", {
        description: `Streak: ${streak + 1}`,
      });
      
      setTimeout(() => {
        setQuestion(generateQuestion(operation));
        setUserAnswer("");
        setFeedback(null);
      }, 1500);
    } else {
      setStreak(0);
      toast.error(`❌ Not quite! The answer was ${question.correctAnswer}`, {
        description: "Try the next one!",
      });
      
      setTimeout(() => {
        setQuestion(generateQuestion(operation));
        setUserAnswer("");
        setFeedback(null);
      }, 2000);
    }
  };

  const handleNewQuestion = () => {
    setQuestion(generateQuestion(operation));
    setUserAnswer("");
    setFeedback(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 shadow-card hover:shadow-hover transition-all bg-gradient-to-br from-card to-muted/30">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl animate-bounce-in">{getOperationEmoji(operation)}</span>
            <h2 className="text-3xl font-bold capitalize bg-gradient-primary bg-clip-text text-transparent">
              {operation}
            </h2>
          </div>

          {streak > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 animate-scale-in">
              <span className="text-xl">🔥</span>
              <span className="font-semibold text-success">Streak: {streak}</span>
            </div>
          )}

          <div className="bg-muted/50 rounded-2xl p-8 space-y-6">
            <div className="text-6xl font-bold text-foreground flex items-center justify-center gap-6">
              <span className="animate-slide-up">{question.num1}</span>
              <span className="text-primary text-5xl">{getOperationSymbol(operation)}</span>
              <span className="animate-slide-up animation-delay-100">{question.num2}</span>
              <span className="text-primary text-5xl">=</span>
              <span className="text-muted-foreground">?</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="text-center text-2xl h-14 text-foreground placeholder:text-muted-foreground border-2"
                autoFocus
                disabled={feedback !== null}
              />

              <div className="flex gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-lg font-semibold shadow-card hover:shadow-hover transition-all"
                  disabled={feedback !== null}
                >
                  {feedback === null ? "Check Answer ✓" : "Checking..."}
                </Button>
                
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={handleNewQuestion}
                  className="border-2"
                >
                  <RefreshCw className="w-5 h-5" />
                </Button>
              </div>
            </form>

            {feedback && (
              <div className={`flex items-center justify-center gap-3 p-4 rounded-xl animate-bounce-in ${
                feedback === "correct" 
                  ? "bg-success/10 text-success border border-success/20" 
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}>
                {feedback === "correct" ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 animate-celebrate" />
                    <span className="font-semibold text-lg">Correct! 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6" />
                    <span className="font-semibold text-lg">Try again! 💪</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Quiz;
