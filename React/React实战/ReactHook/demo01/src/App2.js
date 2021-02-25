import React, { useReducer} from 'react';
function App2(){
    const [count,dispatch] = useReducer((state,action)=>{
        switch(action.type){
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default :
                return state; 
        }
    },0);//初始值为0 第一个参数是一个方法用来处理action操作
    return(
        <div>
            <p>你点击了{count}次！</p>
            <button onClick={()=>dispatch({type:'add'})}>加</button>
            <button onClick={()=>dispatch({type:'sub'})}>减</button>
        </div>
    );
}

export default App2;