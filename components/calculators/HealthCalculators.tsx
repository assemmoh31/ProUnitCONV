
import React, { useState } from 'react';
import { GeminiAssistant } from '../GeminiAssistant.tsx';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const inputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white text-gray-900";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";

// --- BMI CALCULATOR ---
export const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(70); // kg

  const bmi = weight / Math.pow(height / 100, 2);
  let category = '';
  let color = '';

  if (bmi < 18.5) { category = 'Underweight'; color = 'text-blue-500'; }
  else if (bmi < 25) { category = 'Normal'; color = 'text-green-500'; }
  else if (bmi < 30) { category = 'Overweight'; color = 'text-yellow-500'; }
  else { category = 'Obese'; color = 'text-red-500'; }

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

// --- MACRO CALCULATOR ---
export const MacroCalculator: React.FC = () => {
    const [cals, setCals] = useState(2000);
    const [goal, setGoal] = useState('maintain'); // lose, maintain, gain

    // Default Ratios
    let pRatio = 0.3, fRatio = 0.3, cRatio = 0.4;
    
    if (goal === 'lose') { pRatio = 0.4; fRatio = 0.3; cRatio = 0.3; }
    if (goal === 'gain') { pRatio = 0.3; fRatio = 0.2; cRatio = 0.5; }

    const protein = Math.round((cals * pRatio) / 4);
    const fat = Math.round((cals * fRatio) / 9);
    const carbs = Math.round((cals * cRatio) / 4);

    const data = [
        { name: 'Protein', value: protein },
        { name: 'Fats', value: fat },
        { name: 'Carbs', value: carbs }
    ];
    const COLORS = ['#ef4444', '#eab308', '#3b82f6'];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Daily Calories</label>
                    <input type="number" value={cals} onChange={e => setCals(Number(e.target.value))} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Goal</label>
                    <select value={goal} onChange={e => setGoal(e.target.value)} className={inputClass}>
                        <option value="lose">Lose Weight (High Protein)</option>
                        <option value="maintain">Maintain (Balanced)</option>
                        <option value="gain">Build Muscle (High Carb)</option>
                    </select>
                </div>
                <div className="space-y-2 mt-4">
                    <div className="flex justify-between p-2 bg-red-50 rounded text-red-700"><span>Protein</span><span>{protein}g</span></div>
                    <div className="flex justify-between p-2 bg-yellow-50 rounded text-yellow-700"><span>Fats</span><span>{fat}g</span></div>
                    <div className="flex justify-between p-2 bg-blue-50 rounded text-blue-700"><span>Carbs</span><span>{carbs}g</span></div>
                </div>
            </div>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- BODY FAT ESTIMATOR (US Navy Method) ---
export const BodyFatCalculator: React.FC = () => {
    const [gender, setGender] = useState('male');
    const [waist, setWaist] = useState(85); // cm
    const [neck, setNeck] = useState(38); // cm
    const [height, setHeight] = useState(178); // cm
    const [hip, setHip] = useState(95); // cm (female only)

    let bf = 0;
    // Simplified approximation for demo purposes. Real formula uses logs.
    if (gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    if (isNaN(bf)) bf = 0;

    return (
        <div className="space-y-6">
             <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={gender === 'male'} onChange={() => setGender('male')} name="bf_gender" /> Male
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={gender === 'female'} onChange={() => setGender('female')} name="bf_gender" /> Female
                </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Waist (cm)</label><input type="number" value={waist} onChange={e => setWaist(Number(e.target.value))} className={inputClass} /></div>
                <div><label className={labelClass}>Neck (cm)</label><input type="number" value={neck} onChange={e => setNeck(Number(e.target.value))} className={inputClass} /></div>
                <div><label className={labelClass}>Height (cm)</label><input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className={inputClass} /></div>
                {gender === 'female' && (
                    <div><label className={labelClass}>Hip (cm)</label><input type="number" value={hip} onChange={e => setHip(Number(e.target.value))} className={inputClass} /></div>
                )}
            </div>

            <div className="text-center p-6 bg-slate-800 rounded-xl text-white">
                <p className="text-sm opacity-60">Estimated Body Fat</p>
                <p className="text-4xl font-bold mt-2">{bf.toFixed(1)}%</p>
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
