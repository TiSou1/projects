import {CHANGE_INPUT,ADD_ITEM,GET_DATA,DELETE_ITEM} from './actionTypes';

// const data = [
//     'React',
//     'vue',
//     'javascript'
// ]

const defaultState = {
    inputValue:'',
    list:[]
}

export default (state = defaultState, action)=>{
    let newState = JSON.parse(JSON.stringify(state));//深度拷贝上一个state
   switch(action.type){
       case CHANGE_INPUT:{
         newState.inputValue = action.value;
            console.log(state,action);
            return newState;
       }
       case ADD_ITEM:{
           newState.list.push(newState.inputValue);
           newState.inputValue = '';
           return newState;
       }
       case GET_DATA:{
           newState.list = action.list;
           return newState;
       }
       case DELETE_ITEM:{
           newState.list.splice(action.index,1);
           return newState;
       }
       default:return state;
   }
}