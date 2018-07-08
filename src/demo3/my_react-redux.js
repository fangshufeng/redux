/**
 * Created by fangshufeng on 2018/5/1.
 */
import  React from 'react'
import PropsType from  'prop-types'
import {bindActionCreators} from '../demo2/my_redux'

export class Provider extends React.Component {

    static propTypes = {
        store: PropsType.object.isRequired
    };

    getChildContext = () => {
        return {store: this.props.store};
    };

    static childContextTypes = {
        store: PropsType.object,
    };

    render() {
        return this.props.children;
    }
}

export const connect = (mapStateToProps, mapDispatchToProps) => (WrapComponent) => {
    return class InnerComponent extends React.Component {

        static  contextTypes = {
            store:  PropsType.object,
        };

        constructor(props) {
            super(props);
            this.state = {
                connectProps: {}
            }
        }

        componentDidMount() {
            const {store} = this.context;
            store.subscribe(this.updateData);
            this.updateData();
        }
        updateData = () => {
            const {store} = this.context;
            const mapState = mapStateToProps(store.getState());
            const bindAction = bindActionCreators(mapDispatchToProps,store.dispatch);
            this.setState({
                connectProps:{
                    ...this.state.connectProps,
                    ...mapState,
                    ...bindAction
                }
            })
        };

        render() {
            return <WrapComponent {...this.state.connectProps}/>
        }
    }
};