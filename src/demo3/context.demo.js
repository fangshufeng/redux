/**
 * Created by fangshufeng on 2018/4/30.
 */

import React from 'react'
import PropTypes from 'prop-types';

class Button extends React.Component {

    static  contextTypes = {
        color: PropTypes.string
    };

    render() {
        // console.log(this.context);
        return (
            <button style={{background: this.context.color}}>
                {this.props.children}
            </button>
        );
    }
}


class Message extends React.Component {

    render() {
        return (
            <div>
                {this.props.text} <Button>Delete</Button>
            </div>
        );
    }
}

class MessageList extends React.Component {
    getChildContext = () => {
        return {color: "purple"};
    };

    static childContextTypes = {
        color: PropTypes.string
    };

    render() {
        // const color = "purple";
        const children = this.props.messages.map((message, index) =>
            <Message text={message.text} key={index}/>
        );
        return <div>{children}</div>;
    }
};

export default  MessageList;