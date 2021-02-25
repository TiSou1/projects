import React, { useState,useCallback} from 'react';

const set = new Set();
function Foo() {
    const [count, setCount] = useState(0);
  
    const handleClick= useCallback(
        ()=>{
            setCount(count+1);
            console.log(`点击了${count}次`);
        },
        [count]
    );
    //当count改变时会返回新的函数，count不改变set.size不变也就是说没返回新函数
    set.add(handleClick);     
    return (
        <div>
            <h2>{set.size}</h2>
            <button onClick={handleClick}>Click Me</button>
        </div>
    );
  }

  export default Foo;