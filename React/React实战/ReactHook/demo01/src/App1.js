import React, { useState,useEffect,createContext, useContext } from 'react';
const CountContext = createContext();
function App1(){
    const [count,setCount] = useState(0);
    return(
        <div>
            <p>你点击了{count}次！</p>
            <button onClick={()=>setCount(count + 1)}>点击</button>
            <CountContext.Provider value={count}>
            {/*相当于把count变量允许跨层级实现传递和使用了 */}
            <Counter />
            </CountContext.Provider>
        </div>
    );
}

function Counter(){
    const count = useContext(CountContext);//得到App1的count
    return <h2>{count}</h2>
}

 export default App1;