
import React, { useState } from 'react';
import { 
  Calculator, DollarSign, Percent, Scale, TrendingUp, Activity, Utensils, Calendar, 
  Fuel, Menu, X, Home, Zap, Server, BarChart2, Sigma, Code, GraduationCap, Boxes
} from 'lucide-react';

import { CalculatorType, CalculatorDef } from './types.ts';
import { AdSpace } from './components/AdSpace.tsx';

// Calculators
import { LoanCalculator, CompoundInterestCalculator, CurrencyConverter, TipCalculator, DiscountCalculator, RetirementCalculator, ROICalculator } from './components/calculators/FinanceCalculators.tsx';
import { BMICalculator, CalorieCalculator, AgeCalculator, MacroCalculator, BodyFatCalculator } from './components/calculators/HealthCalculators.tsx';
import { ScientificCalculator, UnitConverter, FuelCalculator } from './components/calculators/ScienceCalculators.tsx';
import { OhmsLawCalculator, ResistorCalculator } from './components/calculators/EngineeringCalculators.tsx';
import { EquationSolver, MatrixCalculator, ComplexCalculator } from './components/calculators/MathCalculators.tsx';
import { DescriptiveStatistics, RegressionCalculator } from './components/calculators/StatisticsCalculators.tsx';
import { BaseConverter } from './components/calculators/CodingCalculators.tsx';

// --- DATA ---
const CALCULATORS: CalculatorDef[] = [
  // Math
  { id: 'basic', title: 'Scientific Calculator', description: 'Advanced operations with memory.', icon: <Calculator />, category: 'math' },
  { id: 'equation', title: 'Equation Solver', description: 'Solve Linear and Quadratic equations.', icon: <Sigma />, category: 'math' },
  { id: 'matrix', title: 'Matrix Calculator', description: 'Determinants and basic matrix ops.', icon: <Boxes />, category: 'math' },
  { id: 'complex', title: 'Complex Numbers', description: 'Operations with imaginary numbers.', icon: <Activity />, category: 'math' },

  // Finance
  { id: 'loan', title: 'Loan Calculator', description: 'Estimate payments and interest.', icon: <DollarSign />, category: 'finance' },
  { id: 'compound', title: 'Investment Growth', description: 'Compound interest visualization.', icon: <TrendingUp />, category: 'finance' },
  { id: 'retirement', title: 'Retirement Planner', description: 'Plan your financial future.', icon: <GraduationCap />, category: 'finance' },
  { id: 'roi', title: 'ROI Calculator', description: 'Return on Investment analysis.', icon: <Percent />, category: 'finance' },
  { id: 'currency', title: 'Currency Converter', description: 'Major world currencies.', icon: <DollarSign />, category: 'finance' },

  // Health
  { id: 'bmi', title: 'BMI Calculator', description: 'Body Mass Index health score.', icon: <Scale />, category: 'health' },
  { id: 'calorie', title: 'Calorie (TDEE)', description: 'Daily energy needs calculator.', icon: <Utensils />, category: 'health' },
  { id: 'macro', title: 'Macro Nutrients', description: 'Protein, Carbs, and Fat breakdown.', icon: <Utensils />, category: 'health' },
  { id: 'bodyfat', title: 'Body Fat %', description: 'US Navy method estimation.', icon: <Scale />, category: 'health' },

  // Engineering
  { id: 'ohms', title: 'Ohm\'s Law', description: 'Voltage, Current, Resistance relation.', icon: <Zap />, category: 'engineering' },
  { id: 'resistor', title: 'Resistor Codes', description: '4-band resistor color calculator.', icon: <Zap />, category: 'engineering' },
  
  // Statistics
  { id: 'stats', title: 'Descriptive Stats', description: 'Mean, Median, Mode, SD.', icon: <BarChart2 />, category: 'science' },
  { id: 'regression', title: 'Regression', description: 'Linear regression with graph.', icon: <TrendingUp />, category: 'science' },

  // Coding & Tools
  { id: 'base', title: 'Base Converter', description: 'Binary, Hex, Decimal, Octal.', icon: <Code />, category: 'coding' },
  { id: 'unit', title: 'Unit Converter', description: 'Length, Weight, Temp, and more.', icon: <Server />, category: 'everyday' },
  
  // Everyday
  { id: 'tip', title: 'Tip Calculator', description: 'Split bills easily.', icon: <Percent />, category: 'everyday' },
  { id: 'age', title: 'Age Calculator', description: 'Exact age in years/months/days.', icon: <Calendar />, category: 'everyday' },
  { id: 'discount', title: 'Discount Calculator', description: 'Sale price calculator.', icon: <Percent />, category: 'everyday' },
  { id: 'fuel', title: 'Fuel Cost', description: 'Trip cost estimation.', icon: <Fuel />, category: 'everyday' },
];

const CATEGORIES = ['All', 'Math', 'Finance', 'Health', 'Engineering', 'Science', 'Coding', 'Everyday'];

function App() {
  const [activeCalc, setActiveCalc] = useState<CalculatorType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCalculators = activeCategory === 'All' 
    ? CALCULATORS 
    : CALCULATORS.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());

  const renderCalculator = () => {
    switch (activeCalc) {
      // Finance
      case 'loan': return <LoanCalculator />;
      case 'compound': return <CompoundInterestCalculator />;
      case 'retirement': return <RetirementCalculator />;
      case 'roi': return <ROICalculator />;
      case 'currency': return <CurrencyConverter />;
      case 'tip': return <TipCalculator />;
      case 'discount': return <DiscountCalculator />;
      
      // Health
      case 'bmi': return <BMICalculator />;
      case 'calorie': return <CalorieCalculator />;
      case 'macro': return <MacroCalculator />;
      case 'bodyfat': return <BodyFatCalculator />;
      case 'age': return <AgeCalculator />;
      
      // Science/Math
      case 'basic': return <ScientificCalculator />;
      case 'scientific': return <ScientificCalculator />;
      case 'equation': return <EquationSolver />;
      case 'matrix': return <MatrixCalculator />;
      case 'complex': return <ComplexCalculator />;
      case 'unit': return <UnitConverter />;
      case 'fuel': return <FuelCalculator />;
      
      // Engineering
      case 'ohms': return <OhmsLawCalculator />;
      case 'resistor': return <ResistorCalculator />;
      
      // Stats
      case 'stats': return <DescriptiveStatistics />;
      case 'regression': return <RegressionCalculator />;
      
      // Coding
      case 'base': return <BaseConverter />;
      
      default: return <ScientificCalculator />;
    }
  };

  const getActiveDef = () => CALCULATORS.find(c => c.id === activeCalc);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">CalcHub AI</h1>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-500"><X /></button>
        </div>
        
        <nav className="px-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)] no-scrollbar">
          <button 
            onClick={() => { setActiveCalc(null); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${!activeCalc ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Home size={18} /> Home
          </button>
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Calculators</p>
          </div>
          
          {CALCULATORS.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i).map((calc) => (
             <button
               key={calc.id}
               onClick={() => { setActiveCalc(calc.id); setSidebarOpen(false); }}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeCalc === calc.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
             >
               <span className={activeCalc === calc.id ? 'text-indigo-600' : 'text-gray-400'}>{calc.icon}</span>
               {calc.title}
             </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t">
            <AdSpace slot="sidebar" className="h-48 w-full !bg-slate-100" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600"><Menu /></button>
            <h2 className="text-lg font-semibold text-gray-800">
              {activeCalc ? getActiveDef()?.title : 'Dashboard'}
            </h2>
          </div>
          <div className="hidden md:block">
             {/* Header Ad Space */}
             <div className="w-96 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300">
                Top Banner Ad
             </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-slate-50">
          
          {!activeCalc ? (
            <div className="max-w-7xl mx-auto animate-fade-in">
               <div className="mb-8 text-center">
                 <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome to CalcHub AI</h2>
                 <p className="text-gray-500 text-lg">Select a tool below to get started with advanced calculations.</p>
               </div>

               {/* Category Filter */}
               <div className="flex flex-wrap justify-center gap-2 mb-10">
                 {CATEGORIES.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>

               {/* Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                 {filteredCalculators.map((calc, idx) => (
                   <div 
                     key={idx}
                     onClick={() => setActiveCalc(calc.id)}
                     className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all cursor-pointer group"
                   >
                     <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {calc.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">{calc.category}</span>
                     </div>
                     <h3 className="font-bold text-gray-900 mb-1 text-lg">{calc.title}</h3>
                     <p className="text-sm text-gray-500 leading-relaxed">{calc.description}</p>
                   </div>
                 ))}
               </div>
               
               <AdSpace slot="inline" className="mb-8 max-w-4xl mx-auto" />
            </div>
          ) : (
            <div className="max-w-5xl mx-auto animate-fade-in">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex justify-between items-center">
                   <div>
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {getActiveDef()?.icon}
                        {getActiveDef()?.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{getActiveDef()?.description}</p>
                   </div>
                   <button onClick={() => setActiveCalc(null)} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Back to Home</button>
                </div>
                <div className="p-6 md:p-10">
                  {renderCalculator()}
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <AdSpace slot="inline" />
                 <AdSpace slot="inline" />
              </div>
            </div>
          )}
          
          <footer className="mt-12 text-center text-gray-400 text-sm pb-6">
            <p>&copy; 2024 CalcHub AI. All rights reserved.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
