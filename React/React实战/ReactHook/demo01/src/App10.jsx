import React, { useState, useEffect } from 'react';


const App = () => {
    const URL = 'https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1';
    const [data, setData] = useState({});

    useEffect(() => {
        console.log('useEffect...');
        const resp = fetch(URL).then(res => {
          console.log(res)
        });
        setData({
          list:'S'
        })
    },[]);
    console.log('render');
    console.log(data.list);
    return (
        <div>
          // display content here
        </div>
    )
}


export default App;