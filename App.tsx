import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Percent, 
  Scale, 
  TrendingUp, 
  Activity, 
  Utensils, 
  Calendar, 
  FlaskConical, 
  MoveHorizontal, 
  Fuel,
  Menu,
  X,
  Home
} from 'lucide-react';

import { CalculatorType, CalculatorDef } from './types';
import { AdSpace } from './components/AdSpace';

// Calculators
import { LoanCalculator, CompoundInterestCalculator, CurrencyConverter, TipCalculator, DiscountCalculator } from './components/calculators/FinanceCalculators';
import { BMICalculator, CalorieCalculator, AgeCalculator } from './components/calculators/HealthCalculators';
import { ScientificCalculator, UnitConverter, FuelCalculator } from './components/calculators/ScienceCalculators';

// --- DATA ---
const CALCULATORS: CalculatorDef[] = [
  { id: 'basic', title: 'Scientific Calculator', description: 'Advanced math operations with memory.', icon: <Calculator />, category: 'math' },
  { id: 'bmi', title: 'BMI Calculator', description: 'Check your Body Mass Index health score.', icon: <Scale />, category: 'health' },
  { id: 'loan', title: 'Loan Calculator', description: 'Estimate monthly payments and interest.', icon: <DollarSign />, category: 'finance' },
  { id: 'compound', title: 'Compound Interest', description: 'Visualize investment growth over time.', icon: <TrendingUp />, category: 'finance' },
  { id: 'currency', title: 'Currency Converter', description: 'Convert between major world currencies.', icon: <DollarSign />, category: 'finance' },
  { id: 'tip', title: 'Tip Calculator', description: 'Split bills and calculate tips easily.', icon: <Percent />, category: 'everyday' },
  { id: 'unit', title: 'Unit Converter', description: 'Length, Weight, and Temperature.', icon: <MoveHorizontal />, category: 'math' },
  { id: 'calorie', title: 'Calorie Calculator', description: 'Calculate daily TDEE and BMR.', icon: <Utensils />, category: 'health' },
  { id: 'age', title: 'Age Calculator', description: 'Calculate exact age in years, months, days.', icon: <Calendar />, category: 'everyday' },
  { id: 'discount', title: 'Discount Calculator', description: 'Find the final price after sales.', icon: <Percent />, category: 'everyday' },
  { id: 'fuel', title: 'Fuel Cost', description: 'Estimate trip costs based on mileage.', icon: <Fuel />, category: 'everyday' },
  { id: 'gpa', title: 'GPA Calculator', description: 'Calculate Grade Point Average.', icon: <Activity />, category: 'math' }
];

const CATEGORIES = ['All', 'Finance', 'Health', 'Math', 'Everyday'];

function App() {
  const [activeCalc, setActiveCalc] = useState<CalculatorType | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCalculators = activeCategory === 'All' 
    ? CALCULATORS 
    : CALCULATORS.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());

  const renderCalculator = () => {
    switch (activeCalc) {
      case 'loan': return <LoanCalculator />;
      case 'compound': return <CompoundInterestCalculator />;
      case 'currency': return <CurrencyConverter />;
      case 'tip': return <TipCalculator />;
      case 'discount': return <DiscountCalculator />;
      case 'bmi': return <BMICalculator />;
      case 'calorie': return <CalorieCalculator />;
      case 'age': return <AgeCalculator />;
      case 'basic': return <ScientificCalculator />;
      case 'scientific': return <ScientificCalculator />;
      case 'unit': return <UnitConverter />;
      case 'fuel': return <FuelCalculator />;
      case 'gpa': return <ScientificCalculator />; // Placeholder for now
      default: return <ScientificCalculator />;
    }
  };

  const getActiveDef = () => CALCULATORS.find(c => c.id === activeCalc);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
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
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
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
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          
          {!activeCalc ? (
            <div className="max-w-6xl mx-auto animate-fade-in">
               <div className="mb-8 text-center">
                 <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to CalcHub AI</h2>
                 <p className="text-gray-500">Select a tool below to get started.</p>
               </div>

               {/* Category Filter */}
               <div className="flex flex-wrap justify-center gap-2 mb-8">
                 {CATEGORIES.map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
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
                     className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all cursor-pointer group"
                   >
                     <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                       {calc.icon}
                     </div>
                     <h3 className="font-bold text-gray-900 mb-1">{calc.title}</h3>
                     <p className="text-sm text-gray-500">{calc.description}</p>
                   </div>
                 ))}
               </div>
               
               <AdSpace slot="inline" className="mb-8" />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                   <div>
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {getActiveDef()?.icon}
                        {getActiveDef()?.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{getActiveDef()?.description}</p>
                   </div>
                </div>
                <div className="p-6 md:p-8">
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