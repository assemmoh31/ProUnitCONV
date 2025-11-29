import React, { useState } from 'react';
import { GeminiAssistant } from '../GeminiAssistant';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// --- BMI CALCULATOR ---
export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg

  const bmi = weight / Math.pow(height / 100, 2);
  let category = '';
  let color = '';
  let width = '0%';

  if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; width = '25%'; }
  else if (bmi < 25) { category = 'Normal'; color = 'text-green-500'; width = '50%'; }
  else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-500'; width = '75%'; }
  else { category = 'Obese'; color = 'text-red-500'; width = '100%'; }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Height (cm)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Weight (kg)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputClass} />
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl text-center">
        <p className="text-gray-500 text-sm uppercase tracking-wide">Your BMI</p>
        <p className="text-5xl font-bold text-gray-800 my-2">{bmi.toFixed(1)}</p>
        <p className={`font-semibold text-lg ${color}`}>{category}</p>
        
        <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 w-full opacity-30"></div>
          <div 
            className="absolute top-0 h-full w-1 bg-gray-800 transition-all duration-500" 
            style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` }} 
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>15</span><span>25</span><span>40</span>
        </div>
      </div>
      <GeminiAssistant context={`BMI Calculation: Height ${height}cm, Weight ${weight}kg.`} result={`BMI: ${bmi.toFixed(1)}, Category: ${category}`} />
    </div>
  );
};

// --- CALORIE CALCULATOR (TDEE) ---
export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [activity, setActivity] = useState(1.2);

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === 'male' ? bmr + 5 : bmr - 161;
  const tdee = bmr * activity;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} name="gender" /> Male
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} name="gender" /> Female
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} className={inputClass} />
        <input type="number" placeholder="H (cm)" value={height} onChange={(e) => setHeight(Number(e.target.value))} className={inputClass} />
        <input type="number" placeholder="W (kg)" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={inputClass} />
      </div>
      <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className={inputClass}>
        <option value={1.2}>Sedentary (Office job)</option>
        <option value={1.375}>Light Exercise (1-2 days/week)</option>
        <option value={1.55}>Moderate Exercise (3-5 days/week)</option>
        <option value={1.725}>Heavy Exercise (6-7 days/week)</option>
        <option value={1.9}>Athlete (2x per day)</option>
      </select>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-100">
          <div className="text-xs text-orange-500 font-bold">BMR (Basal)</div>
          <div className="text-xl font-bold text-gray-800">{Math.round(bmr)}</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
          <div className="text-xs text-green-600 font-bold">TDEE (Daily Needs)</div>
          <div className="text-xl font-bold text-gray-800">{Math.round(tdee)}</div>
        </div>
      </div>
    </div>
  );
};

// --- AGE CALCULATOR ---
export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  
  const calculateAge = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  const age = calculateAge();

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="w-full">
        <label className={labelClass}>Date of Birth</label>
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className={inputClass} />
      </div>
      
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-white shadow-sm border p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-blue-600">{age.years}</span>
          <span className="text-xs text-gray-500 uppercase">Years</span>
        </div>
        <div className="bg-white shadow-sm border p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-purple-600">{age.months}</span>
          <span className="text-xs text-gray-500 uppercase">Months</span>
        </div>
        <div className="bg-white shadow-sm border p-4 rounded-xl text-center">
          <span className="block text-3xl font-bold text-pink-600">{age.days}</span>
          <span className="text-xs text-gray-500 uppercase">Days</span>
        </div>
      </div>
    </div>
  );
};
