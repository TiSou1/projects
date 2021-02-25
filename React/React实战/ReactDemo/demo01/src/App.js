import React,{Component} from "react";
import LiItem from "./LiItem";
import axios from "axios";
import Boss from "./Boss";
import {CSSTransition,TransitionGroup} from "react-transition-group";



// import React from "react"
// const Component = React.Component;


class App extends Component{
    constructor(props){
        super(props);
        this.myref = React.createRef();
        this.state = {
            //基础显示内容
            values:["React","JavaScript"],
            inputValue:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }
    
    handleChange(e){
        this.setState({
            inputValue: this.input.value
                //将input这个dom绑定到this.input属性上,等价于e.target.value
        });
    }

    addClick(){
        this.setState({
            values:[...this.state.values,this.state.inputValue],
            inputValue:""
        });
    }
    deleteClick(index){
        //console.log(index);
        //let values = [].concat(this.state.values);
        //let values =this.state.values.slice();
        let values = [...this.state.values];
        //values.pop();
        values.splice(index,1);
        //console.log(values);
        //console.log(this.state.values);
        this.setState({
            values:values
        });
    }
    componentDidMount(){
        console.log("componentDidMount");
        axios.post("https://web-api.juejin.im/v3/web/wbbr/bgeda",)
            .then((res)=>{console.log("数据获取成功:"+JSON.stringify(res));})
            .catch((error)=>{console.log("获取数据失败:"+error)})
    }
    
    render(){
        //state , props 改变时
        console.log("parent-render");
        return(
            <React.Fragment>
            {/*撒打*/}
            <div>
                <label htmlFor="input1">添加:</label>
                <input 
                id="input1" 
                value={this.state.inputValue} 
                onChange={this.handleChange}
                ref = {(inpu)=>{this.input = inpu;}}
                />
                <button onClick={this.addClick}>添加</button>
            </div>
                <ul>
                    <TransitionGroup>
                    {this.state.values.map((value,index)=>{
                        //onClick={(e) => this.deleteRow(id, e)sdsafas
                        //onClick={this.deleteClick.bind(this,index)}
                        //return <li key={value+index} onClick={(e)=>this.deleteClick(index,e)}>{value}</li>;
                        return (
                            <CSSTransition
                                timeout={2000}
                                classNames="boss-text"
                                unmountOnExit
                                key={index+value}
                                appear={false}
                            >
                                 <LiItem
                                value={value}
                                key={value+index}
                                index={index}
                                onDeleteClick={this.deleteClick}
                                 />
                            </CSSTransition>
                        );
                    })}
                    </TransitionGroup>
                </ul>
                <Boss />
            </React.Fragment>
        );
    }
}



export default App;