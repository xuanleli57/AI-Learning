import { GoogleGenAI } from "@google/genai";
import { ModuleType } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchTopicExplanation = async (
  module: ModuleType,
  topicTitle: string,
  context: string
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      Role: You are an expert professor in ${module}.
      Task: Explain the concept of "${topicTitle}".
      Context: ${context}
      
      Requirements:
      1. Use clear, academic but accessible language (Chinese).
      2. Use Markdown formatting (headers, bold, code blocks).
      3. Adhere to "Number & Shape Combination" (数型结合): Explain the math formulas and describe how they look geometrically or graphically.
      4. Provide a small Python code snippet example where applicable.
      5. Keep it under 800 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No content generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Error loading content: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

export const analyzeUploadedCode = async (code: string, fileName: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are a senior Python and AI engineer.
      The user has uploaded a file named "${fileName}".
      
      Please analyze the following code:
      \`\`\`python
      ${code}
      \`\`\`
      
      Provide:
      1. A summary of what the code does.
      2. Line-by-line or block-by-block explanation of key logic.
      3. Suggestions for optimization or bug fixes if any.
      4. Return the response in Markdown format (Chinese).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      config: {
        thinkingConfig: { thinkingBudget: 1024 }, // Use thinking for better code analysis
      },
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Code Analysis Error:", error);
    return `Error analyzing code: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};
