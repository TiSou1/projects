import React, { Component } from 'react';
import {Route,Link} from "react-router-dom";
import Learn1 from "./Learn1";
import Learn2 from "./Learn2";
function Video(){
    return(
       <div>
            <h2>我是video</h2>
            <ul>
                <li><Link to="/components/video/learn1">React</Link></li>
                <li><Link to="/components/video/learn2">CSS</Link></li>
            </ul>
           <div>
                <Route path="/components/video/learn1"  component={Learn1}/>
                <Route path="/components/video/learn2"  component={Learn2}/>
           </div>
       </div>
    );
}
export default Video;