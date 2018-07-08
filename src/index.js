import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './demo1'


//测试自己的react_redux
import MessageList from './demo3/context.demo'
import {Provider} from './demo3/my_react-redux'
import Home from './demo3/Home'
import {createStore,applyMiddleware, thunk} from './demo2/my_redux'
// import  {applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
import changeSum from './reducer'

// const store = createStore(changeSum,applyMiddleware(log,thunk));

const store = createStore(changeSum);

const next = store.dispatch;

const async = (next) => (action) => {
    if (typeof  action === 'function') {
        console.log('async');
        return action(store.dispatch,store.getState());
    }
    return  next(action);
};

const log = (next) => (action) => {
    console.log('log_begin');
    return  next(action);
};

store.dispatch = (action) => log(async(next))(action);

ReactDOM.render(<Provider store={store}><Home/></Provider>, document.getElementById('root'));
registerServiceWorker();




/* 测试code
* let fuc1 = () => {
 console.log(`Hello Word!`);
 };

 // fuc1();

 let fuc2 = (fuc) => () => {
 console.log(`fuc调用之前`);
 fuc();
 } ;

 fuc1 = fuc2(fuc1);
 fuc1();
* */

