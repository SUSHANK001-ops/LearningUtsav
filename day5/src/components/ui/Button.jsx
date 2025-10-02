import { ShoppingBag } from "lucide-react";
import React from "react";

const Button = () => {
  return (
    <button className="relative cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border-2 border-rose-500 font-semibold rounded-full overflow-hidden group">
      <span className="absolute inset-0 bg-rose-500 transition-transform duration-300 ease-in-out -translate-y-full group-hover:translate-y-0"></span>
      <span className="relative flex items-center gap-2 z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
        <ShoppingBag /> Shop Now
      </span>
    </button>
  );
};

export default Button;
