import React, { Component } from 'react';
let [c1,c2,c3] = ['btn1','bnt2','btn3'];			
class Bb extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.click1 = this.click1.bind(this,c1);
    }
    click1(c1){
        console.log(this,c1);
    }
    click2(c2){
        console.log(this,c2);
    }
    click3 = () => {
        console.log(this);
    }
      render() {
        return (
            <div>
            <button onClick={this.click1}>按钮1</button>
            <button onClick={this.click2.bind(this,c2)}>按钮2</button>
            <button onClick={this.click3}>按钮3</button>
            </div>
        );
      }
}
 
export default Bb;