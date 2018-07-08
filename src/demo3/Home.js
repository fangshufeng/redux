/**
 * Created by fangshufeng on 2018/5/1.
 */
import React from 'react'
// import {connect} from './my_react-redux'
import {connect} from 'react-redux'
import {increaseAction,reduceAction,asyncAction} from './text.redux'

class Home extends React.Component {
    render() {
        console.log('dsada',this.props);

        return <h2>测试redux 和 react-redux原理
            <p/>
            <div>当前的数字是:{this.props.sum}</div>
            <button onClick={() => {
                this.props.increaseAction()
            }}>增加数字</button>

            <button onClick={() => {
                this.props.reduceAction()
            }}>减少数字</button>

            <button onClick={() => {
                this.props.asyncAction()
            }}>3s后增加数字</button>
        </h2>;
    }
};

export default connect(state=>state,{increaseAction,reduceAction,asyncAction})(Home);