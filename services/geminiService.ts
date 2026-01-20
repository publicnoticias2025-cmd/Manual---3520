
import { GoogleGenAI } from "@google/genai";

const BRAND_CONTEXT = `
Você é o assistente estratégico da marca do Dr. Antônio Falcão, cardiologista.
Diretrizes da Marca:
- Arquétipo: Sábio e Protetor.
- Missão: Proporcionar excelência em saúde cardiovascular com precisão e humanidade.
- Tom de Voz: Didático, Seguro, Empático e Inspiracional.
- Cores: Azul Marinho (Autoridade), Vermelho (Vida/Urgência Vital), Cinza (Técnica).
- Público: Pacientes que buscam exclusividade técnica pulsando vida.
`;

export const generateBrandContent = async (topic: string) => {
  // Ensure the AI client uses process.env.API_KEY directly
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Com base no contexto da marca Dr. Antônio Falcão: ${BRAND_CONTEXT}
    Gere uma sugestão de postagem para redes sociais (Instagram ou LinkedIn) sobre o seguinte tópico: "${topic}".
    Inclua:
    1. Uma legenda envolvente seguindo o tom de voz "Sábio e Protetor".
    2. Sugestão de imagem/visual alinhado à marca.
    3. 5 Hashtags estratégicas.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      return "Erro: Chave de API não encontrada ou inválida. Verifique as configurações de ambiente do Netlify.";
    }
    return "Houve um erro ao consultar a inteligência da marca.";
  }
};
