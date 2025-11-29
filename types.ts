export type CalculatorType = 
  | 'basic'
  | 'scientific'
  | 'bmi'
  | 'loan'
  | 'compound'
  | 'currency'
  | 'tip'
  | 'unit'
  | 'calorie'
  | 'age'
  | 'discount'
  | 'fuel'
  | 'gpa';

export interface CalculatorDef {
  id: CalculatorType;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'finance' | 'health' | 'math' | 'everyday';
}

export interface AdProps {
  slot: 'header' | 'sidebar' | 'inline';
  className?: string;
}