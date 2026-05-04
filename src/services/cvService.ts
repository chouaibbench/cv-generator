import { GoogleGenAI } from "@google/genai";
import { CVData } from "../types/cv";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const generateAISummary = async (data: CVData): Promise<string> => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('MISSING_API_KEY');
  }

  const lang = data.language === 'fr' ? 'French' : 'English';
  
  const prompt = `
    Based on the following professional info, generate a 3-sentence professional and impactful summary for a CV in ${lang}.
    
    Name: ${data.personalInfo.fullName}
    Target Role: ${data.personalInfo.jobTitle}
    Experience: ${data.experience.map(e => `${e.position} at ${e.company} (${e.description})`).join('; ')}
    Skills: ${data.skills.map(s => s.name).join(', ')}
    
    Tone: Professional, modern, and direct. Use action verbs.
    Language: ${lang}
    Don't include any prefixes or meta-commentary, just the summary text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || '';
  } catch (error) {
    console.error('Gemini error:', error);
    throw error;
  }
};

export const saveToLocalStorage = (data: CVData) => {
  localStorage.setItem('cv-data', JSON.stringify(data));
};

export const loadFromLocalStorage = (): CVData | null => {
  const saved = localStorage.getItem('cv-data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
};
