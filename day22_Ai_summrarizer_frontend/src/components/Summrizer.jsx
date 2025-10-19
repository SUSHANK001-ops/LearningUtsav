import { useState } from "react";
import Navbar from "./Navbar";
import { summarizerAPI } from "../api/services";
import { useNavigate } from "react-router-dom";

export default function Summrizer() {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [tone, setTone] = useState("neutral");
    const [remainingLimit, setRemainingLimit] = useState(null);
    const navigate = useNavigate();

    async function handleSummarize(e) {
        e.preventDefault();
        if (!text.trim()) {
            setError("Please enter some text to summarize");
            return;
        }

        setLoading(true);
        setError("");
        setSummary("");

        try {
            // Send both keys to be compatible with various controller expectations
            const data = await summarizerAPI.summarize(text, tone);

            // Extract summarized text from response
            const summaryText = data?.summarizedText || data?.summary || data?.result || "";
            setSummary(summaryText);
            
            // Update remaining limit if provided
            if (data?.remainingLimit !== undefined) {
                setRemainingLimit(data.remainingLimit);
            }
        } catch (err) {
            console.error("Summarization error:", err);
            const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to summarize text. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
       <Navbar />
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Text Summarizer</h1>
            <form onSubmit={handleSummarize} className="space-y-4">
                <label htmlFor="summ-input" className="block text-lg font-semibold mb-2">
                    Enter or paste text to summarize
                </label>
                <textarea
                    id="summ-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your text here..."
                    rows={10}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <div className="flex items-center gap-3">
                    <label htmlFor="tone" className="text-sm text-gray-700">Tone</label>
                    <select
                        id="tone"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                        <option value="neutral">Neutral</option>
                        <option value="formal">Formal</option>
                        <option value="casual">Casual</option>
                        <option value="concise">Concise</option>
                        <option value="professional">Professional</option>
                    </select>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <button
                        type="submit"
                        disabled={loading || !text.trim()}
                        className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${loading || !text.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {loading ? "Summarizing..." : "Summarize"}
                    </button>
                    <span className="text-gray-600 text-sm">
                        {text.length} characters
                    </span>
                    {remainingLimit !== null && (
                        <span className="text-gray-600 text-sm ml-auto">
                            {remainingLimit} summaries remaining today
                        </span>
                    )}
                </div>
            </form>

            <div className="mt-6">
                {error && (
                    <div
                        role="alert"
                        className="bg-red-100 text-red-700 p-3 rounded-lg border border-red-300"
                    >
                        {error}
                    </div>
                )}

                {summary && (
                    <div className="space-y-4">
                        <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-100 whitespace-pre-wrap">
                            <h2 className="font-semibold text-lg">Summary ({tone}):</h2>
                            {summary}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
                            >
                                View Dashboard
                            </button>
                            <button
                                onClick={() => {
                                    setText("");
                                    setSummary("");
                                    setError("");
                                }}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                            >
                                New Summary
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
         </>
    );
}
