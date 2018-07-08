/**
 * Created by fangshufeng on 2018/5/13.
 */

function changeSum(state={},action) {
    switch (action.type) {
        case 'increase':
            return {...state, sum: state.sum+1};
        case 'reduce':
            return {...state, sum: state.sum-1};
        default:
            return {sum: 0};
    }
};

export default changeSum;