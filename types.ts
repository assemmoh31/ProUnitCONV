
export type CalculatorType = 
  | 'basic'
  | 'scientific'
  | 'equation'
  | 'matrix'
  | 'complex'
  | 'bmi'
  | 'calorie'
  | 'macro'
  | 'bodyfat'
  | 'loan'
  | 'compound'
  | 'currency'
  | 'retirement'
  | 'roi'
  | 'stats'
  | 'regression'
  | 'probability'
  | 'ohms'
  | 'resistor'
  | 'beam'
  | 'fluid'
  | 'unit'
  | 'timezone'
  | 'storage'
  | 'base'
  | 'tip'
  | 'age'
  | 'discount'
  | 'fuel'
  | 'gpa'
  | 'ai-solver';

export interface CalculatorDef {
  id: CalculatorType;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'finance' | 'health' | 'math' | 'science' | 'engineering' | 'coding' | 'everyday' | 'ai';
}

export interface AdProps {
  slot: 'header' | 'sidebar' | 'inline';
  className?: string;
}
