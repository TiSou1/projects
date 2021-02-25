import React, { Component } from 'react';
import Show from "./Show";
import Search from "./Search";
import  "./css/App1.css"
class App1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputName:""
         }
    }
    addClick = (inputName)=>{
        this.setState({
            //解构赋值
            inputName
        });
    }
    render() { 
        return ( 
            <div className="main">
                <Search addClick={this.addClick}/>
                <Show inputName={this.state.inputName}/>              
            </div>
         );
    }
}
 
export default App1;