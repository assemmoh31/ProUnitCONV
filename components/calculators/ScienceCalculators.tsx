
import React, { useState } from 'react';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const btnClass = "p-3 rounded-lg font-semibold transition-colors shadow-sm active:scale-95";

// --- BASIC/SCIENTIFIC CALCULATOR ---
export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);

  const handleBtn = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '=') {
      try {
        // eslint-disable-next-line no-eval
        setDisplay(String(eval(display.replace('×', '*').replace('÷', '/'))));
      } catch {
        setDisplay('Error');
      }
    } else if (['sin', 'cos', 'tan', 'log', '√'].includes(val)) {
        try {
            const num = parseFloat(display);
            let res = 0;
            if (val === 'sin') res = Math.sin(num);
            if (val === 'cos') res = Math.cos(num);
            if (val === 'tan') res = Math.tan(num);
            if (val === 'log') res = Math.log10(num);
            if (val === '√') res = Math.sqrt(num);
            setDisplay(String(res));
        } catch {
            setDisplay('Error');
        }
    } else {
      setDisplay(prev => prev === '0' ? val : prev + val);
    }
  };

  const buttons = [
    'C', '(', ')', '÷',
    'sin', 'cos', 'tan', '×',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '√',
    '0', '.', '=', 'log'
  ];

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-slate-900 text-right text-white text-3xl p-4 rounded-t-xl overflow-x-auto no-scrollbar font-mono h-20 flex items-center justify-end">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 bg-slate-200 p-1 rounded-b-xl">
        {buttons.map(btn => {
            let bg = 'bg-white hover:bg-gray-50 text-slate-700';
            if (['C', '(', ')'].includes(btn)) bg = 'bg-slate-300 hover:bg-slate-400 text-slate-800';
            if (['÷', '×', '-', '+', '=', '√', 'log', 'sin', 'cos', 'tan'].includes(btn)) bg = 'bg-cyan-600 hover:bg-cyan-700 text-white';
            
            return (
                <button 
                  key={btn} 
                  onClick={() => handleBtn(btn)} 
                  className={`${btnClass} ${bg}`}
                >
                  {btn}
                </button>
            );
        })}
      </div>
    </div>
  );
};

// --- UNIT CONVERTER ---
export const UnitConverter: React.FC = () => {
  const [type, setType] = useState<'length' | 'weight' | 'temp'>('length');
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const units: any = {
    length: { m: 1, km: 1000, cm: 0.01, ft: 0.3048, in: 0.0254, mi: 1609.34 },
    weight: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
    temp: { c: 'C', f: 'F', k: 'K' } // Special handling
  };

  const convert = () => {
    if (type === 'temp') {
      let val = value;
      // Convert to C
      if (fromUnit === 'f') val = (val - 32) * 5/9;
      if (fromUnit === 'k') val = val - 273.15;
      // Convert from C
      if (toUnit === 'f') return (val * 9/5) + 32;
      if (toUnit === 'k') return val + 273.15;
      return val;
    } else {
      const base = value * units[type][fromUnit];
      return base / units[type][toUnit];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
         {['length', 'weight', 'temp'].map(t => (
             <button 
                key={t}
                onClick={() => { setType(t as any); setFromUnit(Object.keys(units[t])[0]); setToUnit(Object.keys(units[t])[1]); }}
                className={`px-4 py-1 rounded-md capitalize text-sm ${type === t ? 'bg-white shadow text-cyan-600' : 'text-gray-500'}`}
             >
                {t}
             </button>
         ))}
      </div>
      <div className="flex items-center gap-2">
        <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className={inputClass} />
        <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={`${inputClass} w-24`}>
            {Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
      <div className="text-center text-gray-400">↓</div>
      <div className="flex items-center gap-2">
        <div className="w-full p-2 bg-gray-50 border rounded-md text-gray-700 bg-white">{convert().toFixed(4)}</div>
        <select value={toUnit} onChange={e => setToUnit(e.target.value)} className={`${inputClass} w-24`}>
            {Object.keys(units[type]).map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
    </div>
  );
};

// --- FUEL COST CALCULATOR ---
export const FuelCalculator: React.FC = () => {
  const [distance, setDistance] = useState(100);
  const [efficiency, setEfficiency] = useState(25); // mpg
  const [price, setPrice] = useState(3.50);

  const cost = (distance / efficiency) * price;

  return (
    <div className="space-y-4">
      <div>
         <label className={labelClass}>Distance (miles)</label>
         <input type="number" value={distance} onChange={e => setDistance(Number(e.target.value))} className={inputClass} />
      </div>
      <div>
         <label className={labelClass}>Fuel Efficiency (MPG)</label>
         <input type="number" value={efficiency} onChange={e => setEfficiency(Number(e.target.value))} className={inputClass} />
      </div>
      <div>
         <label className={labelClass}>Gas Price ($/gallon)</label>
         <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className={inputClass} />
      </div>
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex justify-between items-center mt-4">
        <span className="text-yellow-800 font-medium">Estimated Cost</span>
        <span className="text-2xl font-bold text-yellow-900">${cost.toFixed(2)}</span>
      </div>
    </div>
  );
};
