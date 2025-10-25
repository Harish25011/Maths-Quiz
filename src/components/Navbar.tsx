import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Plus, Minus, X, Divide, Trophy } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home, emoji: "🏠" },
    { path: "/addition", label: "Addition", icon: Plus, emoji: "➕" },
    { path: "/subtraction", label: "Subtraction", icon: Minus, emoji: "➖" },
    { path: "/multiplication", label: "Multiplication", icon: X, emoji: "✖️" },
    { path: "/division", label: "Division", icon: Divide, emoji: "➗" },
    { path: "/dashboard", label: "Dashboard", icon: Trophy, emoji: "🏆" },
  ];

  return (
    <nav className="bg-card shadow-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl group-hover:animate-celebrate transition-transform">🎯</span>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Math Quiz Master
            </h1>
          </Link>
          
          <div className="flex flex-wrap items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`gap-1 md:gap-2 transition-all ${
                      isActive 
                        ? "bg-gradient-primary shadow-card" 
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="text-base md:text-lg">{item.emoji}</span>
                    <span className="hidden sm:inline text-xs md:text-sm">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
