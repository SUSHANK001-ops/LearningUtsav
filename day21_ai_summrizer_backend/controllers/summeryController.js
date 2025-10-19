const axios = require("axios");
const Summary = require("../models/Summaries");
const User = require("../models/Users");

const summarizeText = async (req, res) => {
  try {
    // Accept both "text" and "originalText" keys from frontend
    const { text, originalText, tone } = req.body;
    const textToSummarize = text || originalText;

    if (!textToSummarize) {
      return res.status(400).json({ message: "Text is required" });
    }

  
    if (req.user.dailyLimit <= 0) {
      return res.status(403).json({ message: "Daily limit exceeded" });
    }
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Summarize the following text: ${textToSummarize} with ${tone ? `a ${tone} tone` : "a neutral tone"}`,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.API_KEY}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", JSON.stringify(response.data, null, 2));

    const summarizedText = response.data.candidates[0].content.parts[0].text;
    const newSummary = new Summary({
      userId: req.user._id,
      originalText: textToSummarize,
      summarizedText,
      tone: req.body.tone || "neutral",
    
    });

    await newSummary.save();

    req.user.dailyLimit -= 1;
    await req.user.save();

    res.status(200).json({ 
      summarizedText,
      remainingLimit: req.user.dailyLimit 
    });
  } catch (error) {
    console.error("Error summarizing text:", error.message);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      console.error("API Status:", error.response.status);
    }
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Get summary history for the authenticated user
const getSummaryHistory = async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    // Get fresh user data to return current dailyLimit
    const user = await User.findById(req.user._id).select('dailyLimit');
    
    console.log(`[getSummaryHistory] User ${req.user._id}: ${summaries.length} summaries, dailyLimit: ${user?.dailyLimit}`);
    
    res.status(200).json({ 
      summaries,
      dailyLimit: user?.dailyLimit || 0,
      totalSummaries: summaries.length
    });
  } catch (error) {
    console.error("Error fetching summary history:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a specific summary by id
const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await Summary.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }
    
    // Give back one quota to the user
    await User.findByIdAndUpdate(req.user._id, { $inc: { dailyLimit: 1 } });
    
    res.status(200).json({ message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Error deleting summary:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { summarizeText, getSummaryHistory, deleteSummary };
