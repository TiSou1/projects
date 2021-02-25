import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import List from './Page/List';
import Page from "./Page/Page";
import Home from "./Page/Home";

class APP extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() { 
        return ( 
            <Router>
                <ul>
                    <li>
                       <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/list/123">列表</Link>
                    </li>
                </ul>
           
                <Route path="/"   component={Page}/>
                <Route path="/list/:id" component={List}/>
                <Route path="/home" component={Home}/>
            </Router>
         );
    }
}
 
export default APP;