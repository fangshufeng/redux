/**
 * Created by fangshufeng on 2018/4/30.
 */

import {createStore} from 'redux'

function reducer(state={},action) {
    switch (action.type) {
        case 'increase':
            return state+1;
        case 'reduce':
            return state-1;
        default:
            return 10;
    }
}
const  store = createStore(reducer);

console.log(`初始化值：${store.getState()}`);

store.subscribe(_ => {
    console.log(`修改后的值：${store.getState()}`);
});

store.dispatch({type:'increase'});
store.dispatch({type:'increase'});
store.dispatch({type:'increase'});

store.dispatch({type:'reduce'});
store.dispatch({type:'reduce'});
store.dispatch({type:'reduce'});