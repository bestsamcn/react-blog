import React from 'react';
import { setToast, setLogin, setToken } from '../../store/actions';
import { connect } from 'react-redux';
import * as API from '../../api';
import { browserHistory  } from 'react-router';
import '../../assets/css/admin/signin.css';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            iShowMsg:false,
            alertMsg:'',
            account:'',
            password:''
        }
    }
    signClick(e){
        e.preventDefault();
        var that = this;
        if(!this.state.account || this.state.account.length< 2){
            this.props.setToast('用户名不能少于2位');
            return;
        }
        if(!this.state.password || this.state.password.length < 6){
            this.props.setToast('密码不能少于6位');
            return;
        }
        API.login({account:that.state.account, password:that.state.password}).then(res=>{
            that.props.setToast(res.msg || '登录成功');
            var token = res.token;
            that.props.setLogin(true);
            that.props.setToken(token);
            window.localStorage && (localStorage['__bestToken__'] = JSON.stringify(token));
            window.localStorage && (localStorage['__bestLogin__'] = true);
            browserHistory.push('/admin/home');
        });
    }
    setValue(e){
        if(e.target.name === 'account'){
            this.setState({account:e.target.value});
        }
        if(e.target.name === 'password'){
            this.setState({password:e.target.value});
        }
    }
    componentWillUnmount() {
        // this.props.isLogin && browserHistory.push('/admin/home');
    }
    render(){
        return(
            <div className="sign">
                <div className="moveup signinpanel signin">
                    <form id="signin-form">
                        <h4 className="text-center sign-title color-purple">Login</h4>
                        <input type="text" value={this.state.account} onChange={this.setValue.bind(this)} className="form-control uname" name="account" placeholder="用户名" />
                        <input type="password" value={this.state.password} onChange={this.setValue.bind(this)} className="form-control pword m-b" name="password" placeholder="密码" />
                        <button className="btn btn-success full-width btn-block m-b" onClick={this.signClick.bind(this)}>登录</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateProps = state=>{
    return{
        isLogin:state.common.isLogin
    }
}
const mapDispatchProps = (dispatch)=>{
    return{
        setToast:(msg)=>dispatch(setToast(msg)),
        setLogin:(bool)=>dispatch(setLogin(bool)),
        setToken:(token)=>dispatch(setToken(token))
    }
}

export default connect(mapStateProps, mapDispatchProps)(Signin);
