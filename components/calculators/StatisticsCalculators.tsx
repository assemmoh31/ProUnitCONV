
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, ZAxis } from 'recharts';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-white text-gray-900";

// --- DESCRIPTIVE STATISTICS ---
export const DescriptiveStatistics: React.FC = () => {
  const [input, setInput] = useState("12, 15, 12, 18, 22, 19, 25, 12");
  
  const nums = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  
  const mean = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const median = nums.length ? (nums.length % 2 === 0 ? (sorted[nums.length/2 - 1] + sorted[nums.length/2])/2 : sorted[Math.floor(nums.length/2)]) : 0;
  
  // Histogram Data
  const histogram = nums.reduce((acc: any, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  const data = Object.keys(histogram).map(k => ({ val: Number(k), count: histogram[k] }));

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Dataset (comma separated)</label>
        <textarea rows={3} value={input} onChange={e => setInput(e.target.value)} className={inputClass} />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-purple-50 p-3 rounded-lg text-center">
            <span className="block text-xs text-purple-400 font-bold uppercase">Count</span>
            <span className="text-xl font-bold text-gray-900">{nums.length}</span>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
            <span className="block text-xs text-purple-400 font-bold uppercase">Mean</span>
            <span className="text-xl font-bold text-gray-900">{mean.toFixed(2)}</span>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
            <span className="block text-xs text-purple-400 font-bold uppercase">Median</span>
            <span className="text-xl font-bold text-gray-900">{median}</span>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
            <span className="block text-xs text-purple-400 font-bold uppercase">Min / Max</span>
            <span className="text-xl font-bold text-gray-900">{Math.min(...(nums.length ? nums : [0]))} / {Math.max(...(nums.length ? nums : [0]))}</span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="val" />
            <Tooltip />
            <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- LINEAR REGRESSION ---
export const RegressionCalculator: React.FC = () => {
    const [points, setPoints] = useState("1,2\n2,4\n3,5\n4,4\n5,8");
    
    const data = points.split('\n').map(line => {
        const [x, y] = line.split(',').map(n => parseFloat(n));
        return { x, y };
    }).filter(p => !isNaN(p.x) && !isNaN(p.y));

    // Simple Linear Regression y = mx + b
    const n = data.length;
    const sumX = data.reduce((a, b) => a + b.x, 0);
    const sumY = data.reduce((a, b) => a + b.y, 0);
    const sumXY = data.reduce((a, b) => a + b.x * b.y, 0);
    const sumXX = data.reduce((a, b) => a + b.x * b.x, 0);

    const m = n ? (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX) : 0;
    const b = n ? (sumY - m * sumX) / n : 0;

    const lineData = data.map(p => ({ x: p.x, y: p.y, regression: m * p.x + b }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className="block text-sm font-medium mb-1">Points (x,y per line)</label>
                <textarea rows={6} value={points} onChange={e => setPoints(e.target.value)} className={`${inputClass} font-mono`} />
                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                    <p className="font-mono text-sm text-gray-600">Equation:</p>
                    <p className="text-xl font-bold text-indigo-600">y = {m.toFixed(2)}x + {b.toFixed(2)}</p>
                </div>
            </div>
            <div className="h-64 border bg-white rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="X" />
                        <YAxis type="number" dataKey="y" name="Y" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Points" data={data} fill="#8884d8" />
                        <Scatter name="Line" data={lineData} line={{ stroke: '#ff7300' }} lineType="fitting" shape={() => null} />
                     </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
