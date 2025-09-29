
import React from "react";

const TodoList = ({ todos, removeTodo, toggleComplete, startEdit, saveEdit }) => {
  const [editValue, setEditValue] = React.useState("");

  const handleEditChange = (e) => setEditValue(e.target.value);

  return (
    <div className="flex justify-center mt-6 px-2">
      <div className="container h-[70vh] w-full sm:w-[80vw] md:w-[60vw] lg:w-[50vw] border rounded-2xl text-center overflow-auto transition-all duration-300">
        <h1 className="font-bold mt-2.5 text-5xl text-rose-500">Your Todos</h1>
        <div className="todos flex flex-col gap-2 items-start mt-4 px-20 py-5 overflow-auto m-14">
          {todos && todos.length > 0 ? (
            todos.map((todo, index) => (
              <div
                key={index}
                className="w-full border text-start px-4 sm:px-5 rounded-xl bg-blue-400 py-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shadow-md"
              >
                {todo.editing ? (
                  <>
                    <input
                      className="text-xl px-2 py-1 rounded w-full sm:w-auto"
                      value={editValue}
                      onChange={handleEditChange}
                      autoFocus
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => {
                        saveEdit(index, editValue);
                        setEditValue("");
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p
                      className={`text-xl w-full sm:flex-1 cursor-pointer break-words ${todo.completed ? "line-through text-gray-400" : ""}`}
                      onClick={() => toggleComplete(index)}
                    >
                      {todo.text}
                    </p>
                    <button
                      className="ml-2 px-2 py-1 bg-yellow-400 rounded"
                      onClick={() => {
                        setEditValue(todo.text);
                        startEdit(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => removeTodo(index)}
                    >
                      Remove
                    </button>
                    <button
                      className={`ml-2 px-2 py-1 rounded ${todo.completed ? "bg-gray-400" : "bg-green-500 text-white"}`}
                      onClick={() => toggleComplete(index)}
                    >
                      {todo.completed ? "Undo" : "Complete"}
                    </button>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="w-full text-gray-500">
              <p className="text-xl">No todos yet. Add some!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
