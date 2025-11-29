import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GeminiAssistant } from '../GeminiAssistant';

// --- Shared Styles ---
const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// --- LOAN CALCULATOR ---
export const LoanCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(30);

  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest },
  ];
  const COLORS = ['#6366f1', '#a855f7'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Loan Amount ($)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Interest Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Loan Term (Years)</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="bg-slate-100 p-4 rounded-lg mt-4">
          <p className="text-sm text-gray-500">Monthly Payment</p>
          <p className="text-2xl font-bold text-primary">${monthlyPayment.toFixed(2)}</p>
        </div>
        <GeminiAssistant 
          context={`Loan Calculator: Principal $${principal}, Rate ${rate}%, Term ${years} years.`}
          result={`Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Interest: $${totalInterest.toFixed(2)}`}
        />
      </div>
      <div className="h-64 flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(0)}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div> Principal</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> Interest</div>
        </div>
      </div>
    </div>
  );
};

// --- COMPOUND INTEREST CALCULATOR ---
export const CompoundInterestCalculator: React.FC = () => {
  const [initial, setInitial] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    let balance = initial;
    const data = [];
    for (let i = 0; i <= years; i++) {
      data.push({ year: i, balance: Math.round(balance) });
      balance = (balance + monthly * 12) * (1 + rate / 100);
    }
    setChartData(data);
  }, [initial, monthly, rate, years]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Initial Investment</label>
            <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Monthly Contribution</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Annual Return (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Time Period (Years)</label>
          <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          <div className="text-right text-sm text-gray-500">{years} Years</div>
        </div>
        <div className="bg-slate-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Future Value</p>
          <p className="text-2xl font-bold text-green-600">${chartData[chartData.length - 1]?.balance.toLocaleString()}</p>
        </div>
         <GeminiAssistant 
          context={`Investment: Initial $${initial}, Monthly $${monthly}, Return ${rate}%, Time ${years} years.`}
          result={`Future Value: $${chartData[chartData.length - 1]?.balance}`}
        />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Area type="monotone" dataKey="balance" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- CURRENCY CONVERTER ---
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
const RATES: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.1, CAD: 1.35, AUD: 1.52 }; // Mock rates

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const result = (amount / RATES[from]) * RATES[to];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className={labelClass}>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="w-24">
           <label className={labelClass}>From</label>
           <select value={from} onChange={(e) => setFrom(e.target.value)} className={inputClass}>
             {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
           </select>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => { setFrom(to); setTo(from); }} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">⇅</button>
      </div>
      <div className="flex gap-2 items-end">
        <div className="flex-1">
           <div className="p-2 bg-gray-50 border border-gray-200 rounded-md text-gray-500">{result.toFixed(2)}</div>
        </div>
        <div className="w-24">
           <label className={labelClass}>To</label>
           <select value={to} onChange={(e) => setTo(e.target.value)} className={inputClass}>
             {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
           </select>
        </div>
      </div>
    </div>
  );
};

// --- TIP CALCULATOR ---
export const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(2);

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  const perPerson = total / people;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Bill Amount</label>
          <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>People</label>
          <input type="number" min="1" value={people} onChange={(e) => setPeople(Number(e.target.value))} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Tip Percentage: {tipPercent}%</label>
        <input type="range" min="0" max="50" value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
        <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0%</span><span>25%</span><span>50%</span></div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-xs text-indigo-400 font-bold uppercase">Tip</div>
          <div className="text-lg font-bold text-indigo-700">${tipAmount.toFixed(2)}</div>
        </div>
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-xs text-indigo-400 font-bold uppercase">Total</div>
          <div className="text-lg font-bold text-indigo-700">${total.toFixed(2)}</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg ring-2 ring-purple-100">
          <div className="text-xs text-purple-400 font-bold uppercase">Per Person</div>
          <div className="text-lg font-bold text-purple-700">${perPerson.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

// --- DISCOUNT CALCULATOR ---
export const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  
  const saved = price * (discount / 100);
  const final = price - saved;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1 space-y-4 w-full">
        <div>
          <label className={labelClass}>Original Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className={inputClass} />
        </div>
      </div>
      <div className="flex-1 w-full bg-green-50 border border-green-200 p-6 rounded-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">YOU SAVE</div>
        <p className="text-gray-500 mb-1">Final Price</p>
        <p className="text-4xl font-bold text-green-600">${final.toFixed(2)}</p>
        <p className="text-sm text-green-700 mt-2">Saved: ${saved.toFixed(2)}</p>
      </div>
    </div>
  );
};
