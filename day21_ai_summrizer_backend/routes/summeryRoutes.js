const express = require("express");
const { summarizeText, getSummaryHistory, deleteSummary } = require("../controllers/summeryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/summarize", authMiddleware, summarizeText);
router.get("/summarize/history", authMiddleware, getSummaryHistory);
router.delete("/summarize/:id", authMiddleware, deleteSummary);

module.exports = router;
