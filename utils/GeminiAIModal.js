// /utils/GeminiAIModal.js
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // ✅ Correct model name
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});

/**
 * Retry wrapper for Gemini API calls with exponential backoff
 * @param {Function} fn - The async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} initialDelay - Initial delay in ms (default: 1000)
 * @returns {Promise} - Result of the function or throws error after all retries
 */
export async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if error is retryable (503, 429, network errors)
      const isRetryable = 
        error.message?.includes("503") || 
        error.message?.includes("overloaded") ||
        error.message?.includes("429") ||
        error.message?.includes("rate limit") ||
        error.message?.includes("ECONNRESET") ||
        error.message?.includes("ETIMEDOUT");
      
      // Don't retry if it's the last attempt or error is not retryable
      if (attempt === maxRetries || !isRetryable) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = initialDelay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}
