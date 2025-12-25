
import { GoogleGenAI } from "@google/genai";

export const getWalletAdvice = async (query: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "Você é o 'Assistente São', a IA da São Wallet de São Tomé e Príncipe. Destaque que recarregamos DIAMANTES para os servidores da EUROPA, ÁFRICA e BRASIL com os preços mais baixos de STP (110 Dimas por 25 STN). Explique que o utilizador deve escolher o servidor correto antes de colocar o ID. Use gírias locais e seja motivador.",
        temperature: 0.6,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tive um problema técnico, mas os nossos diamantes para Europa, África e Brasil continuam a ser os mais baratos de São Tomé!";
  }
};
