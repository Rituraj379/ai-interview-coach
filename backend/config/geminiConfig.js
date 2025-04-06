import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateInterviewQuestions = async (formData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


    const prompt = `Generate 4 interview questions and detailed answers for a ${formData.jobTitle} role. 
    The job requires the following tech stack: ${formData.techStack}. 
    Experience level required: ${formData.experienceLevel}.
    The job description is: ${formData.jobDescription}.
    Format the response as a JSON array where each object has "question" and "answer".`;

    const result = await model.generateContent(prompt);

    // ✅ Extract text correctly
    const responseText = result.response.candidates[0].content.parts[0].text;

    // refined text to parse into json format
    const mockQuestions = responseText
      .replace(/```json/, "") // Remove code block start
      .replace(/```/, "") // Remove code block end
      .replace(/\n/g, " "); // Replace all newlines with spaces

    console.log(mockQuestions);

    // ✅ Parse text to JSON
    const questionsArray = JSON.parse(mockQuestions);

    return questionsArray;
  } catch (error) {
    console.error("Error fetching interview questions:", error);
    return null;
  }
};
