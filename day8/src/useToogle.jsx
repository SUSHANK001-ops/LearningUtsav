import { useState } from "react";

const useToogle  = (defaultVal) =>{
     const [value,setValue] = useState(defaultVal);
     function toogleValue(val){
        console.log(val)
        if(typeof val!='boolean'){
            setValue(!value)
        }
        else{
            setValue(val)
        }
     }
     return[value ,toogleValue]
}


export default useToogle;