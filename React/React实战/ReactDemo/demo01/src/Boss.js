import React, { Component } from 'react';
import {CSSTransition} from "react-transition-group"
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isShow:true
        }
        this.showBoss = this.showBoss.bind(this);
    }
    showBoss(){
        this.setState({
            isShow:this.state.isShow ? false : true
        });
    }
    render() { 
        return (  
            <div>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames="boss-text"
                >
                <div>
                    Boss级人物-孙悟空
                </div>
                </CSSTransition>
             
                <button onClick={this.showBoss}>召唤Boss</button>
            </div>
        );
    }
}
 
export default Boss;