import React, { useState } from 'react';
import { Sparkles, X, MessageSquare } from 'lucide-react';
import { getAIExplanation } from '../services/gemini.ts';

interface GeminiAssistantProps {
  context: string;
  result: string;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ context, result }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setIsOpen(true);
    const response = await getAIExplanation(context, result);
    setExplanation(response);
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={handleAsk}
        className="flex items-center gap-2 text-sm text-primary font-medium hover:text-secondary transition-colors mt-4"
      >
        <Sparkles size={16} />
        Ask AI to explain this result
      </button>
    );
  }

  return (
    <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-4 relative animate-fade-in">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X size={16} />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="bg-white p-2 rounded-full shadow-sm text-primary">
          <Sparkles size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-indigo-900 text-sm mb-1">Gemini Insight</h4>
          {loading ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="animate-pulse">Thinking...</span>
            </div>
          ) : (
            <p className="text-sm text-indigo-800 leading-relaxed">
              {explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};