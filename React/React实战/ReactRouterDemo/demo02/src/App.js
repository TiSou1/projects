import React, { Component } from 'react';
import {BrowserRouter,Link,Route} from "react-router-dom";
import Blg from './components/Blg';
import Audio from "./components/Audio";
import Video from "./components/Video";
import "./app.css"
function App(props){
    return(
        <BrowserRouter>
        <div>
            <div>
                <h3>一级导航</h3>
                <ul>
                    <li><Link to="/">博客教程</Link></li>
                    <li><Link to="/components/video">视频教程</Link></li>
                    <li><Link to="/components/audio">语音教程</Link></li>
                </ul>
            </div>
            <div>
               <Route path="/" exact component={Blg}/>            
               <Route path="/components/video" component={Video}/>
               <Route path="/components/audio" component={Audio}/>
            </div>
        </div>
        </BrowserRouter>
    );
}
export default App;