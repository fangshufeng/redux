/**
 * Created by fangshufeng on 2018/4/30.
 */

export function createStore(reducer, enhancer) {
    if (typeof  enhancer === 'function') {
        return enhancer(createStore)(reducer);
    }
    let currentState = {};
    const listeners = [];
    const getState = () => currentState;
    const subscribe = (listener) => listeners.push(listener);
    const dispatch = (action) => {
        currentState = reducer(currentState, action);
        listeners.map(listener => listener());
    };
    dispatch({type: '@fangshufeng_redux'});
    return {getState, subscribe, dispatch};
};

export const bindActionCreators = (creators, dispatch) => {
    return Object.keys(creators).reduce((accumulator, currentValue) => {
        accumulator[currentValue] = (...args) => dispatch(creators[currentValue](...args));
        return accumulator;
    }, {});
};

export function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer);
        let  _dispatch =  store.dispatch;
        const middlewareAPI = {
            getState: store.getState,
            dispatch: (action) => _dispatch(action)
        };
        let chain =  middlewares.map(middleware => middleware(middlewareAPI));
        _dispatch = compose(...chain)(store.dispatch);
        return {
            ...store,
            dispatch: _dispatch
        }
    }
}

export function thunk({getState, dispatch}) {
    return next => action => {
        if (typeof action === 'function') {
            console.log('begin___thunk___',next);
            return action(dispatch,getState);
        }
       return next(action);
    }
}

export function log({getState, dispatch}) {
    return next => action => {
        console.log('begin___log__',next);
        return next(action);
    }
}

export function compose(...funs) {
    if (funs.length === 0 ) {
        return arg => arg;
    }

    if (funs.length === 1) {
        return funs[0];
    }
    return funs.reduce((result, item) => (...args) => result(item(...args)))
}