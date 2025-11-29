
import React, { useState } from 'react';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 outline-none transition-all bg-white text-gray-900";

// --- OHM'S LAW CALCULATOR ---
export const OhmsLawCalculator: React.FC = () => {
  const [mode, setMode] = useState<'V' | 'I' | 'R'>('V'); // What to calculate
  const [v, setV] = useState(12);
  const [i, setI] = useState(2);
  const [r, setR] = useState(6);

  const calculate = () => {
      if (mode === 'V') return (i * r).toFixed(2);
      if (mode === 'I') return (v / r).toFixed(2);
      if (mode === 'R') return (v / i).toFixed(2);
      return 0;
  };

  return (
    <div className="space-y-8">
        <div className="flex justify-center">
            {/* SVG Triangle Visual */}
            <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <path d="M50 5 L95 90 L5 90 Z" fill="white" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="5" x2="50" y2="90" stroke="#333" strokeWidth="1" opacity="0.1" /> 
                    <line x1="27" y1="48" x2="73" y2="48" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="48" x2="50" y2="90" stroke="#333" strokeWidth="2" />
                    
                    <text x="50" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" 
                          fill={mode === 'V' ? '#f97316' : '#333'} 
                          className="cursor-pointer" onClick={() => setMode('V')}>V</text>
                    <text x="35" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" 
                          fill={mode === 'I' ? '#f97316' : '#333'}
                          className="cursor-pointer" onClick={() => setMode('I')}>I</text>
                    <text x="65" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" 
                          fill={mode === 'R' ? '#f97316' : '#333'}
                          className="cursor-pointer" onClick={() => setMode('R')}>R</text>
                </svg>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className={`p-4 rounded-lg border-2 ${mode === 'V' ? 'border-orange-500 bg-orange-50' : 'border-transparent'}`}>
                <label className="block text-sm font-bold text-gray-500 mb-2">Voltage (V)</label>
                {mode === 'V' ? <span className="text-2xl font-bold text-orange-600">{calculate()} V</span> : 
                <input type="number" value={v} onChange={e => setV(Number(e.target.value))} className={inputClass} />}
            </div>
            <div className={`p-4 rounded-lg border-2 ${mode === 'I' ? 'border-orange-500 bg-orange-50' : 'border-transparent'}`}>
                <label className="block text-sm font-bold text-gray-500 mb-2">Current (I)</label>
                {mode === 'I' ? <span className="text-2xl font-bold text-orange-600">{calculate()} A</span> : 
                <input type="number" value={i} onChange={e => setI(Number(e.target.value))} className={inputClass} />}
            </div>
            <div className={`p-4 rounded-lg border-2 ${mode === 'R' ? 'border-orange-500 bg-orange-50' : 'border-transparent'}`}>
                <label className="block text-sm font-bold text-gray-500 mb-2">Resistance (Ω)</label>
                {mode === 'R' ? <span className="text-2xl font-bold text-orange-600">{calculate()} Ω</span> : 
                <input type="number" value={r} onChange={e => setR(Number(e.target.value))} className={inputClass} />}
            </div>
        </div>
    </div>
  );
};

// --- RESISTOR COLOR CODE ---
const COLORS = [
    { n: 'Black', c: '#000000', t: 'white' }, { n: 'Brown', c: '#8B4513', t: 'white' },
    { n: 'Red', c: '#FF0000', t: 'white' }, { n: 'Orange', c: '#FFA500', t: 'black' },
    { n: 'Yellow', c: '#FFFF00', t: 'black' }, { n: 'Green', c: '#008000', t: 'white' },
    { n: 'Blue', c: '#0000FF', t: 'white' }, { n: 'Violet', c: '#EE82EE', t: 'black' },
    { n: 'Gray', c: '#808080', t: 'black' }, { n: 'White', c: '#FFFFFF', t: 'black' }
];

export const ResistorCalculator: React.FC = () => {
    const [b1, setB1] = useState(1); // Brown
    const [b2, setB2] = useState(0); // Black
    const [mult, setMult] = useState(2); // Red (x100)
    
    const resistance = (Number(`${b1}${b2}`) * Math.pow(10, mult));
    
    const formatRes = (r: number) => {
        if (r >= 1000000) return (r / 1000000) + ' MΩ';
        if (r >= 1000) return (r / 1000) + ' kΩ';
        return r + ' Ω';
    };

    return (
        <div className="space-y-8">
            <div className="h-32 flex items-center justify-center relative">
                {/* Resistor Graphic */}
                <div className="w-64 h-16 bg-[#f3dcb3] rounded-full border-4 border-gray-400 relative flex items-center justify-between px-10 shadow-inner overflow-hidden">
                    <div className="absolute inset-y-0 left-12 w-4" style={{ backgroundColor: COLORS[b1].c }}></div>
                    <div className="absolute inset-y-0 left-20 w-4" style={{ backgroundColor: COLORS[b2].c }}></div>
                    <div className="absolute inset-y-0 right-24 w-4" style={{ backgroundColor: COLORS[mult].c }}></div>
                    <div className="absolute inset-y-0 right-12 w-4 bg-[#D4AF37]"></div> {/* Gold Tolerance fixed */}
                </div>
                {/* Wire Leads */}
                <div className="absolute left-0 w-full h-1 bg-gray-400 -z-10"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Band 1</label>
                    <div className="grid grid-cols-1 gap-1 h-48 overflow-y-auto no-scrollbar border rounded">
                        {COLORS.map((c, i) => (
                            <button key={i} onClick={() => setB1(i)} 
                                className={`h-8 text-xs font-bold ${b1 === i ? 'ring-2 ring-blue-500 z-10' : ''}`} 
                                style={{ backgroundColor: c.c, color: c.t }}>{c.n}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Band 2</label>
                    <div className="grid grid-cols-1 gap-1 h-48 overflow-y-auto no-scrollbar border rounded">
                        {COLORS.map((c, i) => (
                            <button key={i} onClick={() => setB2(i)} 
                                className={`h-8 text-xs font-bold ${b2 === i ? 'ring-2 ring-blue-500 z-10' : ''}`} 
                                style={{ backgroundColor: c.c, color: c.t }}>{c.n}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Multiplier</label>
                    <div className="grid grid-cols-1 gap-1 h-48 overflow-y-auto no-scrollbar border rounded">
                        {COLORS.map((c, i) => (
                            <button key={i} onClick={() => setMult(i)} 
                                className={`h-8 text-xs font-bold ${mult === i ? 'ring-2 ring-blue-500 z-10' : ''}`} 
                                style={{ backgroundColor: c.c, color: c.t }}>10^{i}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center bg-gray-100 p-4 rounded-xl">
                <span className="text-3xl font-bold text-gray-800">{formatRes(resistance)}</span>
                <span className="text-sm text-gray-500 ml-2">± 5%</span>
            </div>
        </div>
    );
};
