/**
 * Created by fangshufeng on 2018/5/1.
 */

export function increaseAction() {
    return {type:'increase'};
}

export function reduceAction() {
    return {type:'reduce'};
}

export function asyncAction() {
    return dispatch => {
        setTimeout(() => {
            dispatch({type:'increase'})
        } , 3000);
    }
}