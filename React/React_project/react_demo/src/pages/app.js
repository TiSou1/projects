import React from 'react';
import './app.scss'
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css'
export default function App(){
    return(
        <div className='container'>
            <h1>欢迎来到App</h1>
            <Link to='/login'>去登陆</Link>
            <br></br>
            <Link to='/home'>去首页</Link>
        </div>
    )
}