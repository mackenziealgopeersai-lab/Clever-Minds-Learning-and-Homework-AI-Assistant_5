
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTutorResponse = async (
  prompt: string, 
  history: { role: 'user' | 'assistant', content: string }[],
  imageB64?: string
) => {
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `You are "Clever Minds AI", a world-class tutor for students of all ages. 
  Your goal is to help them learn, not just give answers. 
  - Use age-appropriate language.
  - Break down complex problems into steps.
  - Use encouraging and lively tone.
  - If an image of homework is provided, analyze it carefully and guide the student.
  - Provide citations for factual claims when using search.`;

  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  const parts: any[] = [{ text: prompt }];
  if (imageB64) {
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageB64
      }
    });
  }

  contents.push({
    role: 'user',
    parts: parts
  });

  const response: GenerateContentResponse = await ai.models.generateContent({
    model,
    contents: contents as any,
    config: {
      systemInstruction,
      tools: [{ googleSearch: {} }]
    }
  });

  return {
    text: response.text || "I'm sorry, I couldn't process that.",
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || ''
    })) || []
  };
};

export const generateQuiz = async (subject: string, topic: string) => {
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Generate a 3-question multiple choice quiz for a student learning ${subject} about ${topic}. Return in JSON format.`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING }
          },
          required: ['question', 'options', 'correctIndex', 'explanation']
        }
      }
    }
  });

  return JSON.parse(response.text || '[]');
};
