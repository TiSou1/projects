import {GET_MY_LIST,CHANGE_INPUT,ADD_ITEM,DELETE_ITEM,GET_LIST} from './actionTypes';
//仓库管理者

// const data = [
//     'React',
//     'CSS',
//     'python'
// ]
const defaultState = {
    inputValue:'',
    list:[]
}//默认数据

export default (state=defaultState,action)=>{
    //console.log('reducer:',state,action);
    let newState = JSON.parse(JSON.stringify(state));//深度拷贝上一个state
     //不改变原来的state 而是重新创建state
   switch(action.type){
        case CHANGE_INPUT: {     
            newState.inputValue = action.value;
            return newState;
       }
       
        case ADD_ITEM:{
            newState.list.unshift(newState.inputValue);
            newState.inputValue = "";
            return newState; 
       }

        case DELETE_ITEM:{
            newState.list.splice(action.index,1);
            return newState; 
       }

       case GET_LIST:{
           newState.list = action.list;
           return newState;
       }

      
       default: return state
   }
   
}