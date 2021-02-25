import React, { useState,useCallback,useMemo } from 'react';
function App7(){
    const [count,setCount] = useState(0);
    const aa = useMemo(()=>{
        console.log("useMemo---");
        return "我是useMemo的返回值";
    },[])
    return (
        <div>
            {count}
            {aa}
            <button onClick={()=>setCount(count+1)}>增加</button>
        </div>
    );
}
export default App7;