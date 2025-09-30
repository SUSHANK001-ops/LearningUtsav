import { useState } from "react";
import GreetingCard from "./GreetingCard";
import ErrorToster from "./ErrorToster";

const input = () => {
  let [uname , setUname] = useState("");
  let [submitedname , setSubmitedname] = useState("")
  let [issubmited , setIssubmited ] =useState(false); 
  let [isenterd, setIsenterd] = useState(true);
  let handleSubmit = (e) =>{
     e.preventDefault();

     if(uname===""){
        setIsenterd(false)
        setIssubmited(false)
        setSubmitedname("")
     } else {
        setIsenterd(true)
        setSubmitedname(uname)
        setIssubmited(true)
     }
     
  }

  return (
    <div >
      <form className="flex gap-5" onSubmit={handleSubmit} >

      <input
        type="text"
        placeholder="Enter the name "
        className="border  p-3 rounded-2xl outline-rose-400 italic border-rose-500 hover:scale-95 transition-all duration-300"
        value={uname}
        onChange={(e)=> setUname(e.target.value)}
      />
      <button
        type="submit"
        className=" border w-[70px] p-1 rounded-xl outline-rose-400 italic border-rose-500 cursor-pointer hover:bg-rose-400 hover:scale-95 transition-all duration-300"
      >
        Submit
      </button>
      </form>
      {!isenterd && <ErrorToster />}
      {issubmited && isenterd && <GreetingCard name={submitedname} />}
    </div>
  );
};

export default input;
