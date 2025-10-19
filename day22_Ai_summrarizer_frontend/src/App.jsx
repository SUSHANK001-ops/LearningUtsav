import React from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center py-12">
          <div className="order-2 md:order-1 flex justify-center">
            <img 
              className="w-full max-w-md rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
              src="https://www.skimming.ai/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fskimming_blog_source%2F68824017dbbcb39e974b099f.webp&w=1920&q=75"
              alt="AI Summarizer"
            />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Your AI <span className="text-rose-600">Summarizer</span>
            </h1>
            <p className="text-xl text-gray-600">
              Summarize your text in a click with the power of AI
            </p>
            <Link to="/summarizer">
              <button className="bg-gradient-to-r from-rose-500 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Summarize Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
