import React, { Component } from 'react';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    addClick = ()=> {
        this.props.addClick(this.input.value);
        this.input.value="";
    }
    render() { 
        return ( 
            <div className="search">
                <h2>搜索github用户</h2>
                <input type="text" ref={(input)=>this.input = input}/>
                <button onClick={this.addClick}>搜索</button>
            </div>
         );
    }
}
 
export default Search;