import Navbar from "@/components/Navbar";
import Quiz from "@/components/Quiz";

const Multiplication = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Multiplication Practice ✖️</h1>
          <p className="text-muted-foreground text-lg">Multiply the numbers!</p>
        </div>
        <Quiz operation="multiplication" />
      </main>
    </div>
  );
};

export default Multiplication;
