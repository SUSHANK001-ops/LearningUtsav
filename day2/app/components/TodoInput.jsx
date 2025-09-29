"use client";
import React, { useState } from "react";


const Input = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      alert("Enter the TODO");
      return;
    }
    addTodo(todo);
    setTodo("");
  };

  return (
    <div className="flex justify-center items-center mt-[10%] px-2 w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
        <input
          className="h-9 border p-4 sm:p-6 rounded-2xl flex-1 min-w-0"
          type="text"
          placeholder="Your todos"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="flex cursor-pointer items-center gap-1 font-bold border p-2 rounded-xl justify-center"
          type="submit"
        >
          <img className="h-8" src="/add.svg" alt="" />
          Add
        </button>
      </form>
    </div>
  );
};

export default Input;
