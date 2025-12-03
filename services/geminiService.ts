import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ScriptAnalysisResult } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_BUILD' });

export const generateViralScript = async (
  originalTranscript: string,
  newTopic: string
): Promise<ScriptAnalysisResult> => {
  
  const systemInstruction = `
    당신은 세계 최고의 유튜브 대본 컨설턴트이자 전문 작가입니다. 
    사용자가 제공한 '성공한 영상의 대본(Original Transcript)'을 심층 분석하여 
    시청 지속 시간을 극대화하는 요소(후킹, 스토리텔링 구조, 호흡, 말투, 반전 등)를 파악하십시오.
    그 후, 그 분석된 구조와 스타일을 그대로 적용하여 사용자가 원하는 '새로운 주제(New Topic)'에 맞는 완벽한 대본을 작성해 주십시오.
    
    결과는 반드시 한국어로 작성되어야 합니다.
  `;

  const prompt = `
    ### 원본 대본 (Original Transcript):
    ${originalTranscript}

    ### 새로운 주제 (New Topic):
    ${newTopic}

    ### 요청 사항:
    1. 원본 대본이 왜 성공했는지 핵심 요소를 분석하세요 (분석 내용은 'analysis' 필드에).
    2. 그 성공 공식을 적용하여 새로운 주제에 대한 유튜브 대본을 작성하세요 (대본 내용은 'script' 필드에).
    3. 대본은 오프닝(Hook), 본론(Body), 결론/CTA(Outro) 구조를 명확히 가지되, 원본의 분위기를 살리세요.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      analysis: {
        type: Type.STRING,
        description: "원본 대본의 성공 요인 분석 (후킹, 구조, 톤앤매너 등)",
      },
      script: {
        type: Type.STRING,
        description: "새로운 주제로 작성된 완성된 대본",
      },
    },
    required: ["analysis", "script"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7, // 창의성과 구조 유지의 균형
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    const jsonResponse = JSON.parse(text) as ScriptAnalysisResult;
    return jsonResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("대본을 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};