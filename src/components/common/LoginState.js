import React from 'react';
import PropTypes from 'prop-types';

const LoginState = ({setLogin, isLogin})=>(
    <a href="javascript:;" onClick={()=>setLogin(!isLogin)}>{isLogin ? '管理' : '登录'}</a>
)

LoginState.propTypes = {
    setLogin:PropTypes.func.isRequired,
    isLogin:PropTypes.bool.isRequired
}

export default LoginState;
