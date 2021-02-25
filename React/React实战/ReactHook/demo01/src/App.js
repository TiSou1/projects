import React, { useState,useEffect } from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom';
function App(){
    const [count,setCount] = useState(0);
    useEffect(()=>{
        console.log(`effect=>点击了${count}次`);
        return ()=>{
            console.log('=================');
        }
    });
    //当count发生变化时，执行useEffect函数 以及清除操作 console.log('=================');
    return(
        <div>
            <p>你点击了{count}次！</p>
            <button onClick={()=>setCount(count + 1)}>点击</button>
            <BrowserRouter>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/list'>列表</Link></li>
                </ul>
                <Route path='/' exact component={Index}/>
                <Route path='/list' exact component={List}/>
            </BrowserRouter>
        </div>
    );
}

function Index(){
    useEffect(()=>{
        console.log("uesEffect=>我是Index界面");
        return ()=>{
            console.log("再见Index界面");
        }
    },[])
    return <h2>hellow,index</h2>
}

function List(){
	const [a,setA] = useState(0);
	
    useEffect(()=>{
        console.log("uesEffect=>我是List界面");
        return ()=>{
            console.log("再见List界面");
        }
    },[])
	console.log("list...");
    return <h2>hellow.list</h2>
}

export default App;