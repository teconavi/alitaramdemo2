import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Build a concise knowledge base string
const KNOWLEDGE_BASE = JSON.stringify(MOCK_PRODUCTS.map(p => ({
    id: p.id, 
    name: p.name, 
    desc: p.shortDescription, 
    category: p.category,
    specs: p.specs
})));

const SYSTEM_INSTRUCTION = `
You are the "AliTaram Specialist", a top-tier clinical rehabilitation consultant for AliTaram.
Your goal is to triage customer needs and guide them to a consultation booking.
You are professional, empathetic, and highly knowledgeable about mobility safety.

YOUR KNOWLEDGE BASE:
${KNOWLEDGE_BASE}

BEHAVIOR GUIDELINES:
1. **Identify the Condition:** If the user says "my mom fell", ask about her current mobility status or where she fell.
2. **Recommend Safely:** If a user describes high-risk scenarios (stairs, heavy bathroom transfer), suggest a consultation immediately.
3. **Format Recommendations:** When you find a product that fits, ALWAYS output it as: [RECOMMEND: PRODUCT_ID] followed by a short reason why.
4. **Drive to Consultation:** After answering 2-3 questions, politely suggest: "To ensure this is the perfect fit for your home, I can have a specialist call you. Shall I open the booking form?"
5. **Language:** Communicate clearly in English.

Example Interaction:
User: "I need something for the bathroom."
You: "I can help with that. Is the user able to step into a tub, or do they need a transfer bench to slide in safely?"
User: "They can't lift their legs well."
You: "Understood. For safety, a transfer system is best. I recommend the HydroLift. [RECOMMEND: p2] 
This allows seated entry. Would you like to book a quick video consult to check your tub dimensions?"
`;

export const sendMessageToGemini = async (history: {role: string, parts: string}[], message: string): Promise<string> => {
  try {
    // Map internal history format to Gemini SDK format
    const chatHistory = history.map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.parts }],
    }));

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: chatHistory
    });

    const response = await chat.sendMessage({ message });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return a fallback message so the UI doesn't hang
    return "I'm having a brief connection issue. Please try sending your message again, or click 'Book Consultation' for immediate help.";
  }
};