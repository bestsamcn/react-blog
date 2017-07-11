import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setToggleMenu } from '../../store/actions';
import { browserHistory } from 'react-router';
import '../../assets/css/common/menu.css';

class Menu extends React.Component{
	constructor(props){
		super(props);

	}
	goAndHideMenu(routerName){
        this.props.setToggleMenu();
        browserHistory.push(routerName);
    }
	render(){
        var _route = this.props.isLogin ? '/admin/home' : '/admin/signin';
		return(
			<div className="animated menu">
		        <a className={this.props.routerName == '首页' ? 'icon-bold active' : 'icon-bold'} onClick={this.goAndHideMenu.bind(this, '/')} >首页</a>
		        <a className={this.props.routerName == '搜索' ? 'icon-bold active' : 'icon-search'} onClick={this.goAndHideMenu.bind(this, '/search')}>搜索</a>
		        <a className={this.props.routerName == '关于' ? 'icon-bold active' : 'icon-leaf'} onClick={this.goAndHideMenu.bind(this, '/about')}>关于</a>
		        <a className={this.props.routerName == '留言' ? 'icon-bold active' : 'icon-comment'} onClick={this.goAndHideMenu.bind(this, '/message')}>留言</a>
		        <a className='icon-user' onClick={this.goAndHideMenu.bind(this,_route)}>{this.props.isLogin ? '管理' :'登录'}</a>
		    </div>
		)
	}
}
Menu.propTypes = {
    routerName:PropTypes.string.isRequired
}
const mapStateProps = state=>{
	return{
		isLogin:state.common.isLogin
	}
}
const mapDispatchProps = dispatch=>{
	return{
		setToggleMenu:()=>dispatch(setToggleMenu())
	}
}

export default connect(mapStateProps, mapDispatchProps)(Menu);
