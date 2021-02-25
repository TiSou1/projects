import React, { useMemo, useState ,useCallback} from 'react';

function App4() {
    const [xiaohong, setXiaohong] = useState('小红');
    const [dalong, setdalong] = useState('大龙');
    return (
        <div>
            <button onClick={() => setXiaohong(new Date().getTime())}>小红</button>
            <button onClick={() => setdalong(new Date().getTime())} >大龙</button>
            <ChildComponent name={xiaohong} item="2">{dalong}</ChildComponent>
        </div >
    )

}


function ChildComponent(props) {
    function changeXiaohong(name) {
        console.log('小红向我们走来...');
        return name + ',小红向我们走来了';
    }
   // const actionXiaohong = useMemo(()=>changeXiaohong(props.name),[props.name]);
    //当第二个参数不发生改变时 ,就不会执行useMemo的第一个参数中的箭头函数
    const actionXiaohong = useCallback(()=>{
        console.log(props.name);
        //当点击小红时 每次都重新返回最新的函数,打印的时间都不相同 ,而点击大龙时每次返回的函数相同时间也想同
        return props.name + ',小红向我们走来了';
    },[props.name]);
    //当第二个参数不发生改变时 ,该回调函数就不会更新

    return (
        <div>
            <div>{actionXiaohong()}</div>
            <div>{props.children}</div>
        </div>
    )
}

export default App4;