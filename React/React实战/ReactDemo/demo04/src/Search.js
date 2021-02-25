import React, { Component } from 'react';

class Seacch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputValue:''
         }
    }
    handleChange = (e)=>{
        this.setState({
            inputValue:e.target.value
        });
       
    }
    handleClick=()=>{
        //将输入数据传到父组件
        this.props.search(this.state.inputValue);
    }
    render() { 
        const {inputValue} = this.state;
        return ( 
            <div>
                <input type="text" value={inputValue} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>查询</button>
            </div>
         );
    }
}
 
export default Seacch;
