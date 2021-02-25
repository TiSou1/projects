import React, { useState, useEffect } from 'react';
function App() {
    //声明一个叫'count'的state变量,初始值为0
    //useState()返回它返回一个有两个值的数组,一个是变量一个是方法
    //第一个值是当前的 state，第二个值是更新 state 的函数
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("useEffect----");
        setTimeout(() => {
            //每次更新状态后调用useEffect
            setCount(count + 1);
        }, 1000);
        //document.title = `You Clicked ${count} times`;
    });
    
    return (
        <div>
            <h2>{count}s</h2>
            <p>You clicked{count}</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

export default App;