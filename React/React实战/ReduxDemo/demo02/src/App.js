import React, {useEffect } from 'react';
import {Input,Button,List} from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import {connect} from 'react-redux';
import {GET_DATA,ADD_ITEM,CHANGE_INPUT,DELETE_ITEM} from './store/actionTypes';
import axios from 'axios';


const App = (props)=>{

    // changeInput(e){
    //        console.log(e.target.value);
    //         const action = {
    //             type:'change_input',
    //             value:e.target.value
    //         }
    //         store.dispatch(action);
    // }
    useEffect(()=>{
        props.get_data();
    },[]);
 
        return ( 
            <div>
            <div>
                <Input
                className="inputValue"
                placeholder="请输入:"
                onChange={props.inputChange}
                value={props.inputValue}
               />
                <Button type="primary" onClick={props.buttonCLick}>提交</Button>
            </div>
            <div className="list">
                <List 
                bordered 
                dataSource={props.list} 
                renderItem={(item,index)=><List.Item onClick={()=>props.deleteItem(index)}>{item}</List.Item>}></List>
            </div>
            </div>
         );
    }

 const stateToProps = (state)=>{
    // console.log(state)//store里的state
     return {
         //将原来的state映射成组件中的props属性
         inputValue:state.inputValue,
         list:state.list
     }
 }
 const dispatchToProps = (dispatch) =>{//将store.dispatch方法挂载到props上
     return{
         inputChange(e){
             const action = {
                type:CHANGE_INPUT,
                value:e.target.value
             }
             dispatch(action);
         },
         buttonCLick(){
            let action ={
                type:ADD_ITEM
            }
            dispatch(action);
         },
         deleteItem(index){
            const action = {
                type:DELETE_ITEM,
                index
            }
            dispatch(action);
        },      
         get_data(){
             axios.get('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
             .then(res=>{
                 console.log(res.data);
                 const action ={
                     type:GET_DATA,
                     list:res.data.list
                 }
                 dispatch(action);
             })
         }

     }
 }

 //connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，
 //然后通过connect再链接到一起，让代码更加清晰和易于维护。这也是React-Redux最大的有点。
export default connect(stateToProps,dispatchToProps)(App);