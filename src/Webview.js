import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/common/Header';
import Loading from './components/common/Loading';
import { connect } from 'react-redux';
import Gotop from './components/common/Gotop';
import Toast from './components/common/Toast';
import Menu from './components/common/Menu';
import './assets/libs/animate.css/animate.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isResizeToMobile:false,
            routerName:''
        }
    }
    onresizeWindow(){
        var cw = document.documentElement.clientWidth || document.body.clientWidth;
        if(cw >= 768){
            this.setState({isResizeToMobile:false});
        }else{
            this.setState({isResizeToMobile:true});
        }
    }
    setRouterName(name){
        this.setState({routerName:name});
    }
    componentWillReceiveProps(nextProps) {
        this.setRouterName(nextProps.routes[nextProps.routes.length-1].title);
    }
    render(){
        return(
            <div>
                <Gotop />
                <ReactCSSTransitionGroup transitionName={{ enter:'fadeIn', leave:'fadeOut' }} transitionEnterTimeout={400} transitionLeaveTimeout={700}>
                    {
                        !!this.props.msg && <Toast msg={this.props.msg} />
                    }
                </ReactCSSTransitionGroup>
                <Loading isLoading={this.props.isLoading} />
                <div className="router-view app-router-view">
                    {this.props.children}
                </div>
            </div>
        )
    }
    componentWillMount(){
        this.onresizeWindow();
    }
}

const mapStateProps = (state)=>{
    return{
        isLogin:state.common.isLogin,
        token:state.common.token,
        isLoading:state.common.isLoading,
        msg:state.common.msg,
        iShowMenu:state.common.iShowMenu
    }
}

export default connect(mapStateProps)(App);
