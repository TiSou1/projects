import {createStore,applyMiddleware,compose} from 'redux';//是同redux-thunk中间件 要引入applyMiddleware
//import thunk from 'redux-thunk'
import  createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import mySagas from './sagas'

//创建仓库 
    // const store = createStore(reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//redux可以放在createStore的第二个参数位置 但是这样dedux调试工具就不能用了,applyMiddleware(thunk)
//使用增加函数前需要先引入compose。可以解决这个问题

const composeEnhancers =   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose

//const enhancer = composeEnhancers(applyMiddleware(thunk))
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const store = createStore( reducer, enhancer) // 创建数据存储仓库

sagaMiddleware.run(mySagas);//执行run方法，让saga运行起来。
export default store;

