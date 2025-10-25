export type OperationType = 'addition' | 'subtraction' | 'multiplication' | 'division';

export interface QuizQuestion {
  num1: number;
  num2: number;
  operation: OperationType;
  correctAnswer: number;
}

export interface QuizStats {
  total: number;
  correct: number;
  wrong: number;
  addition: { total: number; correct: number };
  subtraction: { total: number; correct: number };
  multiplication: { total: number; correct: number };
  division: { total: number; correct: number };
}
