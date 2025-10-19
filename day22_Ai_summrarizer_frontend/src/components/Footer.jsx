import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-sm">AI Summarizer © {new Date().getFullYear()} | All rights reserved</p>
        <p className="text-sm mt-2">
          Made with ❤️ by <a href="https://www.sushank.me/" className="text-indigo-400 hover:text-indigo-300 transition-colors">SushankCode</a>
        </p>
      </footer>
  )
}

export default Footer