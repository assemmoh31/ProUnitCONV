import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIExplanation = async (context: string, result: string): Promise<string> => {
  try {
    const prompt = `
      You are a helpful mathematical assistant in a calculator app.
      The user is performing a calculation.
      
      Context: ${context}
      Result: ${result}
      
      Please provide a brief, helpful explanation of this result. 
      For finance, explain the implications (e.g., total interest paid). 
      For health, explain the BMI category or calorie needs generally.
      For math, explain the formula used if relevant.
      Keep it short (max 3 sentences) and friendly.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "I couldn't generate an explanation at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now.";
  }
};