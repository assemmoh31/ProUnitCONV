
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GeminiAssistant } from '../GeminiAssistant.tsx';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// --- EQUATION SOLVER (Quadratic) ---
export const EquationSolver: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-3);
  const [c, setC] = useState(2);

  // Calculate roots
  const discriminant = b * b - 4 * a * c;
  let roots = "";
  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    roots = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
  } else if (discriminant === 0) {
    const x = -b / (2 * a);
    roots = `x = ${x.toFixed(2)}`;
  } else {
    roots = "No real roots";
  }

  // Generate graph data
  const data = [];
  for (let x = -10; x <= 10; x++) {
    data.push({ x, y: a * x * x + b * x + c });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Quadratic Equation Solver</h3>
        <p className="text-gray-500 italic font-mono text-sm">ax² + bx + c = 0</p>
        <div className="grid grid-cols-3 gap-2">
          <div><label className={labelClass}>a</label><input type="number" value={a} onChange={e => setA(Number(e.target.value))} className={inputClass} /></div>
          <div><label className={labelClass}>b</label><input type="number" value={b} onChange={e => setB(Number(e.target.value))} className={inputClass} /></div>
          <div><label className={labelClass}>c</label><input type="number" value={c} onChange={e => setC(Number(e.target.value))} className={inputClass} /></div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 font-bold">Roots:</p>
          <p className="text-xl text-blue-900 font-mono">{roots}</p>
        </div>
        <GeminiAssistant context={`Quadratic Equation: ${a}x² + ${b}x + ${c} = 0`} result={`Roots: ${roots}`} />
      </div>
      <div className="h-64 border rounded-lg p-2 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" domain={['auto', 'auto']} />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="red" />
            <Line type="monotone" dataKey="y" stroke="#2563eb" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- MATRIX CALCULATOR (2x2 Determinant) ---
export const MatrixCalculator: React.FC = () => {
  const [m, setM] = useState({ a: 1, b: 2, c: 3, d: 4 });
  const det = (m.a * m.d) - (m.b * m.c);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h3 className="font-semibold text-lg text-center">2x2 Matrix Determinant</h3>
      <div className="flex items-center justify-center gap-4 text-3xl">
        <span className="text-6xl font-thin text-gray-300">[</span>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={m.a} onChange={e => setM({...m, a: Number(e.target.value)})} className={`${inputClass} text-center`} />
          <input type="number" value={m.b} onChange={e => setM({...m, b: Number(e.target.value)})} className={`${inputClass} text-center`} />
          <input type="number" value={m.c} onChange={e => setM({...m, c: Number(e.target.value)})} className={`${inputClass} text-center`} />
          <input type="number" value={m.d} onChange={e => setM({...m, d: Number(e.target.value)})} className={`${inputClass} text-center`} />
        </div>
        <span className="text-6xl font-thin text-gray-300">]</span>
      </div>
      <div className="text-center bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-500 text-sm">Determinant (ad - bc)</p>
        <p className="text-2xl font-bold text-gray-800">{det}</p>
      </div>
    </div>
  );
};

// --- COMPLEX NUMBER CALCULATOR ---
export const ComplexCalculator: React.FC = () => {
  const [real1, setReal1] = useState(3);
  const [imag1, setImag1] = useState(2);
  const [real2, setReal2] = useState(1);
  const [imag2, setImag2] = useState(7);
  const [op, setOp] = useState('+');

  let resReal = 0;
  let resImag = 0;

  if (op === '+') { resReal = real1 + real2; resImag = imag1 + imag2; }
  if (op === '-') { resReal = real1 - real2; resImag = imag1 - imag2; }
  if (op === '*') { resReal = real1 * real2 - imag1 * imag2; resImag = real1 * imag2 + imag1 * real2; }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-center text-sm font-bold mb-2">Number 1</p>
          <div className="flex gap-2">
            <input type="number" value={real1} onChange={e => setReal1(Number(e.target.value))} className={inputClass} placeholder="Re" />
            <span className="self-center">+</span>
            <input type="number" value={imag1} onChange={e => setImag1(Number(e.target.value))} className={inputClass} placeholder="Im" />
            <span className="self-center">i</span>
          </div>
        </div>

        <div className="flex justify-center">
            <select value={op} onChange={e => setOp(e.target.value)} className="p-3 bg-white border rounded-full text-xl shadow-sm text-gray-900">
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">×</option>
            </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <p className="text-center text-sm font-bold mb-2">Number 2</p>
          <div className="flex gap-2">
            <input type="number" value={real2} onChange={e => setReal2(Number(e.target.value))} className={inputClass} placeholder="Re" />
            <span className="self-center">+</span>
            <input type="number" value={imag2} onChange={e => setImag2(Number(e.target.value))} className={inputClass} placeholder="Im" />
            <span className="self-center">i</span>
          </div>
        </div>
      </div>
      
      <div className="text-center bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <p className="text-gray-500 uppercase text-xs font-bold tracking-wider">Result</p>
        <p className="text-3xl font-mono text-indigo-700 mt-2">
            {resReal} {resImag >= 0 ? '+' : '-'} {Math.abs(resImag)}i
        </p>
      </div>
    </div>
  );
};
