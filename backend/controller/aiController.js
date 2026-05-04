import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/userSchema.js";
import { configDotenv } from "dotenv";

export const suggestDoctor = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Symptoms are required!"
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ FIXED MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview"
    });

    const prompt = `
Based on these symptoms: "${symptoms}"
Suggest ONLY one medical department like Cardiology, Neurology, Dermatology.
Return only the department name.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    let suggestedDepartment = response.text()?.replace(/\./g, "").trim();

    if (!suggestedDepartment) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate department"
      });
    }

    const doctors = await User.find({
      role: "Doctor",
      doctorDepartment: {
        $regex: new RegExp(suggestedDepartment, "i")
      }
    }).select("firstName lastName doctorDepartment docAvatar phone");

    return res.status(200).json({
      success: true,
      suggestedDepartment,
      doctors,
      message: doctors.length
        ? `Doctors found in ${suggestedDepartment}`
        : `No doctors found`
    });

  } catch (error) {
    console.error("AI ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

