import React, { Component } from 'react';
import AppUi from './AppUi'
import {getMyListAction,changeInputAction,addItemAction,deleteItemAction,getTodoList} from "./store/actionCreators";
import store from './store/index';//获取store的值
//可简写为import store from './store' 
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.state = store.getState();//获取到store的数据存入到state
        console.log(store.getState());
        this.changeInput = this.changeInput.bind(this);
        //绑定this指向当前组件(对象) 
        this.addClick = this.addClick.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.storyChange = this.storyChange.bind(this);
        store.subscribe(this.storyChange);//订阅Redux的状态
    }
    //thunk写法
    // componentDidMount(){
    //     //console.log("componentDidMount");
    //         const action = getTodoList();//这里的action是个函数 在这个函数里面有有个dispatch方法会向story
    //         //传递action对象
    //         store.dispatch(action);//因为action为函数,这时的dispatch会经过中间件thunk 
    //         //thunk将getTodoList()里最本质的action对象 进行提交到store    
    // }
    //saga写法
    componentDidMount(){
        const action = getMyListAction();
        store.dispatch(action);
        //console.log(action);
    }
    changeInput(e){
   
        const action = changeInputAction(e.target.value);
        store.dispatch(action);//通过dispatch()方法传递action
    }
     
    addClick(){
       // console.log("click");
       const action = addItemAction()
       if(this.state.inputValue===""){
           alert("请输入内容！");
            //window.confirm("请输入内容！");
       }else{
        store.dispatch(action);
       }
      
    }
    deleteItem(index){
        console.log(`你删除的是第${index + 1}项`);
        const action = deleteItemAction(index);
        store.dispatch(action);
    }
    storyChange(){
        this.setState(store.getState());    
        //让受控组件input 也能正常显示输入内容
    }

    render() {
        return (
            <AppUi
            list={this.state.list}
            inputValue={this.state.inputValue}
            onClick={this.addClick}
            onChange={this.changeInput}
            deleteItem={this.deleteItem}
            />
        );
    }
}

export default App;