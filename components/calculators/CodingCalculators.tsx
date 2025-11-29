
import React, { useState } from 'react';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-500 outline-none transition-all font-mono";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

export const BaseConverter: React.FC = () => {
  const [val, setVal] = useState("255");
  
  // Convert based on Decimal input for simplicity in this demo, 
  // in a real app we'd track source base to avoid precision loss
  const num = parseInt(val, 10) || 0;

  const handleChange = (v: string, base: number) => {
      const parsed = parseInt(v, base);
      if (!isNaN(parsed)) {
          setVal(parsed.toString(10));
      } else if (v === "") {
          setVal("0");
      }
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
        <div className="p-4 bg-slate-900 rounded-xl text-green-400 font-mono text-sm shadow-lg">
            <p className="mb-2 opacity-50">// Real-time Base Conversion</p>
            <div className="space-y-4">
                <div>
                    <label className="text-slate-400 text-xs uppercase">Decimal (Base 10)</label>
                    <input type="text" value={val} 
                           onChange={e => setVal(e.target.value)} 
                           className="w-full bg-slate-800 border-none rounded p-2 focus:ring-1 focus:ring-green-500 text-green-400" />
                </div>
                <div>
                    <label className="text-slate-400 text-xs uppercase">Binary (Base 2)</label>
                    <input type="text" value={num.toString(2)} 
                           onChange={e => handleChange(e.target.value, 2)} 
                           className="w-full bg-slate-800 border-none rounded p-2 focus:ring-1 focus:ring-green-500 text-green-400" />
                </div>
                <div>
                    <label className="text-slate-400 text-xs uppercase">Hexadecimal (Base 16)</label>
                    <input type="text" value={num.toString(16).toUpperCase()} 
                           onChange={e => handleChange(e.target.value, 16)} 
                           className="w-full bg-slate-800 border-none rounded p-2 focus:ring-1 focus:ring-green-500 text-green-400" />
                </div>
                <div>
                    <label className="text-slate-400 text-xs uppercase">Octal (Base 8)</label>
                    <input type="text" value={num.toString(8)} 
                           onChange={e => handleChange(e.target.value, 8)} 
                           className="w-full bg-slate-800 border-none rounded p-2 focus:ring-1 focus:ring-green-500 text-green-400" />
                </div>
            </div>
        </div>
    </div>
  );
};
