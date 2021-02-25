import {GET_MY_LIST,CHANGE_INPUT,ADD_ITEM,DELETE_ITEM,GET_LIST} from './actionTypes';
import axios from 'axios';
const changeInputAction = (value) =>(
    {
        type:CHANGE_INPUT,
        value
    }
)

const addItemAction = () =>(
    {
        type:ADD_ITEM,
    }
)

const deleteItemAction = (index) =>(
    {
        type:DELETE_ITEM,
        index
    }
)
const getListAction = (list) =>(
    {
        type:GET_LIST,
        list
    }
)

const getTodoList = () =>{
    //异步进行axios请求
    return (dispatch)=>{
        //这是在fastmock上自己写的接口
        axios.get('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
        .then((res)=>{
             const {list} = res.data.data;//获取到一个数组
             console.log(res.data.list);
             const items = list.map((item,index)=>{
                return index+1 + "-" + item;
            })
             const action = getListAction(items);
             // console.log(dispatch);
             dispatch(action);
             //dispatch是applymiddleware这个中间件封装好的
        })
    }
}

export const getMyListAction= ()=>(
    {
        type:GET_MY_LIST
    }
)
    


export {changeInputAction,addItemAction,deleteItemAction,getListAction,getTodoList};