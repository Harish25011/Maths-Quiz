import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loadStats, getRewardLevel } from "@/utils/quizHelpers";
import Navbar from "@/components/Navbar";
import { ArrowRight, Plus, Minus, X, Divide, Trophy, Target } from "lucide-react";

const Home = () => {
  const stats = loadStats();
  const reward = getRewardLevel(stats.correct);
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  const operations = [
    { path: "/addition", emoji: "➕", title: "Addition", icon: Plus, color: "bg-gradient-primary" },
    { path: "/subtraction", emoji: "➖", title: "Subtraction", icon: Minus, color: "bg-gradient-secondary" },
    { path: "/multiplication", emoji: "✖️", title: "Multiplication", icon: X, color: "bg-gradient-success" },
    { path: "/division", emoji: "➗", title: "Division", icon: Divide, color: "bg-gradient-primary" },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4 md:space-y-6 animate-fade-in">
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-5xl md:text-7xl animate-bounce-in">🎯</span>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Math Quiz Master
              </h1>
              <span className="text-5xl md:text-7xl animate-bounce-in animation-delay-100">✨</span>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice arithmetic operations with instant feedback and track your progress! 🚀
            </p>
          </section>

          {/* Quick Stats */}
          {stats.total > 0 && (
            <section className="animate-slide-up">
              <Card className="p-6 md:p-8 shadow-card bg-gradient-to-br from-card to-muted/30">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className={`text-4xl md:text-5xl ${reward.color}`}>{reward.emoji}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold">{reward.title}</h3>
                      <p className="text-muted-foreground">Keep up the great work!</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 md:gap-8 text-center">
                    <div className="bg-muted/50 rounded-xl p-4 min-w-[80px]">
                      <div className="text-3xl font-bold text-success">{stats.correct}</div>
                      <div className="text-sm text-muted-foreground">Correct</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 min-w-[80px]">
                      <div className="text-3xl font-bold text-primary">{accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          )}

          {/* Operations Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center">Choose Your Challenge 🎮</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {operations.map((op, index) => {
                const Icon = op.icon;
                return (
                  <Link 
                    key={op.path} 
                    to={op.path}
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="group p-6 shadow-card hover:shadow-hover transition-all cursor-pointer h-full bg-gradient-to-br from-card to-muted/30 hover:scale-105">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <div className={`${op.color} p-4 rounded-2xl group-hover:animate-celebrate transition-transform`}>
                            <span className="text-4xl">{op.emoji}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold">{op.title}</h3>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <Target className="w-4 h-4" />
                          <span>Start Practice</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Dashboard CTA */}
          <section className="text-center animate-fade-in">
            <Card className="p-8 shadow-card bg-gradient-primary">
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-3">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
                    View Your Progress
                  </h2>
                </div>
                <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                  Check your detailed statistics, track your improvement, and earn more rewards!
                </p>
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="mt-4 shadow-card hover:shadow-hover font-semibold"
                  >
                    Open Dashboard 📊
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
