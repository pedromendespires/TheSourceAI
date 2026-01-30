import { GoogleGenAI, Type } from "@google/genai";
import { ManifestationState, QuantumInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getQuantumInsight = async (state: ManifestationState, lang: 'pt' | 'en' = 'pt'): Promise<QuantumInsight> => {
  const languageName = lang === 'pt' ? 'Portuguese (European)' : 'English';
  
  const prompt = `
    Analyze the following quantum manifestation state based on Dr. Joe Dispenza's work:
    
    INTENTIONS (Thoughts): ${state.intentions.map(i => i.text).join(", ")}
    ELEVATED EMOTIONS (Feelings): ${state.emotions.map(e => e.text).join(", ")}
    POTENTIAL SYMBOL: ${state.potentialSymbol}
    
    IMPORTANT: Provide the response in ${languageName}.
    
    Please provide:
    1. A 'Quantum Signature' (a short poetic synthesis phrase).
    2. A brief description of how these forces are collapsing the wave function.
    3. A 'Coherence Score' from 0 to 100 based on compatibility.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Quantum Signature / Poetic Title" },
            description: { type: Type.STRING, description: "Analysis of the alignment" },
            alignmentScore: { type: Type.INTEGER, description: "Coherence score 0-100" }
          },
          required: ["title", "description", "alignmentScore"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      title: result.title || (lang === 'pt' ? "Potencial em Observação" : "Potential Under Observation"),
      description: result.description || (lang === 'pt' ? "O campo está a organizar-se em torno da sua atenção." : "The field is organizing around your attention."),
      alignmentScore: result.alignmentScore || 50
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      title: lang === 'pt' ? "Coerência Inicial" : "Initial Coherence",
      description: lang === 'pt' ? "A sua intenção e emoção estão a começar a ressoar com o campo quântico." : "Your intention and emotion are beginning to resonate with the quantum field.",
      alignmentScore: 50
    };
  }
};