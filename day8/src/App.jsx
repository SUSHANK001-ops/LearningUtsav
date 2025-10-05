import React from "react";
import "./App.css";
import useToogle from "./useToogle";
const App = () => {
  const [value,toogleValue] =useToogle(true)
  console.log(value)
  return (
    <div>
      <button onClick={toogleValue} >toogle</button>
      <button onClick={()=>toogleValue(false)} > Hide</button>
      <button onClick={()=>toogleValue(true)} >show</button>
      
     {
      value?  <h1> This is the heading </h1> :null
     }
    </div>
  );
};

export default App;
