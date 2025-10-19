const axios = require("axios");
const Summary = require("../models/Summaries");
const User = require("../models/Users");

// POST /api/summarize
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
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log("API Response:", JSON.stringify(response.data, null, 2));

    const summarizedText = response.data.candidates[0].content.parts[0].text;
    const newSummary = new Summary({
      userId: req.user._id,
      originalText: textToSummarize,
      summarizedText,
      tone: tone || "neutral",
    });

    await newSummary.save();

    // Decrement user's remaining daily limit
    req.user.dailyLimit = Math.max(0, (req.user.dailyLimit || 0) - 1);
    await req.user.save();

    res.status(200).json({ summarizedText, remainingLimit: req.user.dailyLimit });
  } catch (error) {
    console.error("Error summarizing text:", error.message);
    if (error.response) {
      console.error("API Error Response:", error.response.data);
      console.error("API Status:", error.response.status);
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET /api/summarize/history
const getSummaryHistory = async (req, res) => {
  try {
    const summaries = await Summary.find({ userId: req.user._id }).sort({ createdAt: -1 });
    const user = await User.findById(req.user._id).select("dailyLimit");
    const totalLimit = Number(process.env.DAILY_LIMIT || 10);

    res.status(200).json({
      summaries,
      dailyLimit: user?.dailyLimit ?? 0, // remaining today
      totalSummaries: summaries.length,
      totalLimit,
    });
  } catch (error) {
    console.error("Error fetching summary history:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/summarize/:id
const deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const summary = await Summary.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!summary) {
      return res.status(404).json({ message: "Summary not found" });
    }

    // Optionally increment remaining limit when user deletes a summary
    await User.findByIdAndUpdate(req.user._id, { $inc: { dailyLimit: 1 } });

    res.status(200).json({ message: "Summary deleted successfully" });
  } catch (error) {
    console.error("Error deleting summary:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { summarizeText, getSummaryHistory, deleteSummary };
