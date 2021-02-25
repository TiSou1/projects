import React, { Component,useState } from 'react';
import Search from './Search';
import Show from "./Show";
import axios from "axios";
function App(){ 
    const [values,setvalues]=useState([]);
    function search(input){
        

       // console.log(input);    
       const url=`https://free-api.heweather.net/s6/weather/now?location=${input}&key=863ec2d34d80454da083d78407df9362`   
	   //const url = 'http://127.0.0.1:5000/';
        axios.get(url)
        .then((res)=>{
            //console.log(res.data);
           
			const {data} = res;
            const citys = data.HeWeather6.map((item,index)=>{
                return({
                    city:item.basic.location,
                    tmp:item.now.tmp
                });
            });
            //console.log(citys);
            //更新状态
            setvalues(citys);

        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const list = [
        {name:"王韬",age:22},
        {name:"TiSou1",age:23},
        {name:"Siry",age:21}
    ]
    return(
        <div>
            <Search search={search}/>
            <Show citys={values} name="siry"/>
        </div>
    );
}
export default App;