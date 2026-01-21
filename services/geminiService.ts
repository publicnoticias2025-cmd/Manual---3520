
import { GoogleGenAI } from "@google/genai";

// A API_KEY é injetada automaticamente pelo ambiente
const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });

export const generateBrandContent = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Você é o consultor de branding do Dr. Antônio Falcão. 
        A marca é baseada no arquétipo do Sábio. 
        Cores: Azul Profundo (#1A2B44) e Vermelho Vital (#C61F26). 
        Tom de voz: Sereno, Analítico, Autoritário e Protetor.
        Sua missão é ajudar a aplicar a marca em posts, e-mails e materiais médicos.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Desculpe, tive um problema ao processar sua solicitação de marca.";
  }
};
