import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div
      className="bg-red-100 text-red-600 border
       border-red-400 
    p-3 rounded-lg mt-4 text-center"
    >
      ⚠️ {message}
    </div>
  );
};

export default ErrorMessage;
