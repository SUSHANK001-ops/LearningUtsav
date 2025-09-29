"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Input from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const addTodo = (text) => {
    setTodos([
      ...todos,
      { text, completed: false, editing: false },
    ]);
  };

 
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };


  const toggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const startEdit = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, editing: true } : { ...todo, editing: false }
      )
    );
  };
  const saveEdit = (index, newText) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, text: newText, editing: false } : todo
      )
    );
  };

  return (
    <>
      <Input addTodo={addTodo} />
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        toggleComplete={toggleComplete}
        startEdit={startEdit}
        saveEdit={saveEdit}
      />
    </>
  );
}
