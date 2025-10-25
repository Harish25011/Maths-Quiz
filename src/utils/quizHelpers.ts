import { OperationType, QuizQuestion, QuizStats } from "@/types/quiz";

export const generateQuestion = (operation: OperationType): QuizQuestion => {
  let num1: number, num2: number, correctAnswer: number;

  switch (operation) {
    case 'addition':
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      correctAnswer = num1 + num2;
      break;
    case 'subtraction':
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      correctAnswer = num1 - num2;
      break;
    case 'multiplication':
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      correctAnswer = num1 * num2;
      break;
    case 'division':
      num2 = Math.floor(Math.random() * 10) + 1;
      correctAnswer = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * correctAnswer;
      break;
    default:
      num1 = 0;
      num2 = 0;
      correctAnswer = 0;
  }

  return { num1, num2, operation, correctAnswer };
};

export const getOperationSymbol = (operation: OperationType): string => {
  const symbols = {
    addition: '+',
    subtraction: '-',
    multiplication: '×',
    division: '÷'
  };
  return symbols[operation];
};

export const getOperationEmoji = (operation: OperationType): string => {
  const emojis = {
    addition: '➕',
    subtraction: '➖',
    multiplication: '✖️',
    division: '➗'
  };
  return emojis[operation];
};

export const loadStats = (): QuizStats => {
  const stored = localStorage.getItem('quizStats');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    total: 0,
    correct: 0,
    wrong: 0,
    addition: { total: 0, correct: 0 },
    subtraction: { total: 0, correct: 0 },
    multiplication: { total: 0, correct: 0 },
    division: { total: 0, correct: 0 },
  };
};

export const saveStats = (stats: QuizStats) => {
  localStorage.setItem('quizStats', JSON.stringify(stats));
};

export const updateStats = (operation: OperationType, isCorrect: boolean) => {
  const stats = loadStats();
  stats.total++;
  if (isCorrect) {
    stats.correct++;
  } else {
    stats.wrong++;
  }
  
  stats[operation].total++;
  if (isCorrect) {
    stats[operation].correct++;
  }
  
  saveStats(stats);
};

export const getRewardLevel = (correctAnswers: number): { title: string; emoji: string; color: string } => {
  if (correctAnswers >= 100) return { title: "Math Legend", emoji: "👑", color: "text-warning" };
  if (correctAnswers >= 50) return { title: "Quiz Master", emoji: "🏆", color: "text-primary" };
  if (correctAnswers >= 25) return { title: "Math Wizard", emoji: "🧙‍♂️", color: "text-secondary" };
  if (correctAnswers >= 10) return { title: "Number Ninja", emoji: "🥷", color: "text-success" };
  if (correctAnswers >= 5) return { title: "Rising Star", emoji: "⭐", color: "text-accent" };
  return { title: "Beginner", emoji: "🎯", color: "text-muted-foreground" };
};
