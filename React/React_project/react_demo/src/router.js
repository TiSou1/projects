import React from 'react';
import { BrowserRouter as Router, Route, Switch,useParams,useHistory } from 'react-router-dom'
import App from './pages/app'
import Home from './pages/home'
import Login from './pages/login'
import NoMatch from './pages/404'
export default function IRouter() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={App}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='*' component={NoMatch}></Route>
            </Switch>
        </Router>
    )
}