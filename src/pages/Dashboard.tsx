import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadStats, getRewardLevel } from "@/utils/quizHelpers";
import { Trophy, Target, TrendingUp, Award, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [stats, setStats] = useState(loadStats());
  const reward = getRewardLevel(stats.correct);
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all statistics? This cannot be undone!")) {
      localStorage.removeItem('quizStats');
      setStats(loadStats());
      toast.success("Statistics reset successfully!");
    }
  };

  const operationData = [
    { 
      name: "Addition", 
      emoji: "➕", 
      stats: stats.addition,
      accuracy: stats.addition.total > 0 ? Math.round((stats.addition.correct / stats.addition.total) * 100) : 0,
      color: "bg-gradient-primary"
    },
    { 
      name: "Subtraction", 
      emoji: "➖", 
      stats: stats.subtraction,
      accuracy: stats.subtraction.total > 0 ? Math.round((stats.subtraction.correct / stats.subtraction.total) * 100) : 0,
      color: "bg-gradient-secondary"
    },
    { 
      name: "Multiplication", 
      emoji: "✖️", 
      stats: stats.multiplication,
      accuracy: stats.multiplication.total > 0 ? Math.round((stats.multiplication.correct / stats.multiplication.total) * 100) : 0,
      color: "bg-gradient-success"
    },
    { 
      name: "Division", 
      emoji: "➗", 
      stats: stats.division,
      accuracy: stats.division.total > 0 ? Math.round((stats.division.correct / stats.division.total) * 100) : 0,
      color: "bg-gradient-primary"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center items-center gap-3">
              <Trophy className="w-10 h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Your Dashboard</h1>
            </div>
            <p className="text-muted-foreground text-lg">Track your progress and achievements 📊</p>
          </div>

          {/* Reward Card */}
          <Card className="p-8 shadow-card bg-gradient-to-br from-card to-muted/30 animate-scale-in">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className={`${reward.color} p-6 rounded-3xl animate-celebrate`}>
                  <span className="text-6xl">{reward.emoji}</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{reward.title}</h2>
                <p className="text-muted-foreground">Keep solving to unlock the next level!</p>
              </div>
            </div>
          </Card>

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="p-6 shadow-card hover:shadow-hover transition-all animate-slide-up">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-hover transition-all animate-slide-up animation-delay-100">
              <div className="flex items-center gap-4">
                <div className="bg-success/10 p-4 rounded-2xl">
                  <Award className="w-8 h-8 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Correct Answers</p>
                  <p className="text-3xl font-bold text-success">{stats.correct}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-card hover:shadow-hover transition-all animate-slide-up animation-delay-200">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                  <p className="text-3xl font-bold text-primary">{accuracy}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Operation Breakdown */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Performance by Operation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {operationData.map((op, index) => (
                <Card 
                  key={op.name} 
                  className="p-6 shadow-card hover:shadow-hover transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${op.color} p-3 rounded-xl`}>
                          <span className="text-3xl">{op.emoji}</span>
                        </div>
                        <h3 className="text-xl font-bold">{op.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{op.accuracy}%</p>
                        <p className="text-xs text-muted-foreground">Accuracy</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-lg font-bold">{op.stats.total}</p>
                        <p className="text-xs text-muted-foreground">Attempted</p>
                      </div>
                      <div className="bg-success/10 rounded-lg p-3">
                        <p className="text-lg font-bold text-success">{op.stats.correct}</p>
                        <p className="text-xs text-muted-foreground">Correct</p>
                      </div>
                      <div className="bg-destructive/10 rounded-lg p-3">
                        <p className="text-lg font-bold text-destructive">{op.stats.total - op.stats.correct}</p>
                        <p className="text-xs text-muted-foreground">Wrong</p>
                      </div>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${op.color} transition-all`}
                        style={{ width: `${op.accuracy}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="gap-2 border-2 hover:border-destructive hover:text-destructive"
            >
              <RotateCcw className="w-5 h-5" />
              Reset All Statistics
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
