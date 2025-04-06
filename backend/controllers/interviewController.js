import { generateInterviewQuestions } from "../config/geminiConfig.js";

export const createInterview = async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received interview request:", formData);

    const aiGeneratedData = await generateInterviewQuestions(formData);

    if (!aiGeneratedData) {
      return res.status(500).json({ message: "Failed to generate interview questions" });
    }

    console.log("Generated Interview Data:", aiGeneratedData);

    // ✅ No need to wrap it in another object
    res.json(aiGeneratedData);
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
