import {takeEvery,put} from 'redux-saga/effects';
import {GET_MY_LIST } from './actionTypes';
import { getListAction } from './actionCreators';
import axios from 'axios';
//generator
function* mySaga(){
    //等待捕获action 的type为GET_MY_LIST时，执行后面的getList方法
    yield takeEvery(GET_MY_LIST,getList);
}

function* getList(){  
    //yield等待后面的东西发生 代替了 .then的异步等待
    const res = yield axios.get('https://www.fastmock.site/mock/6f92f55a6b8b6a1bdf0a2f35dcbe01ec/data1/1')
    const action = getListAction(res.data.list);//传递过去一个数组
    console.log(res);   
    yield put(action);
}

export default mySaga;