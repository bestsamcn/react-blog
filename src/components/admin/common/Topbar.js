import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as API from '../../../api';
import { connect } from 'react-redux';
import { setToggleSidebar, setToast, setToken, setLogin } from '../../../store/actions';
import { Dropdown } from 'element-react';
import { browserHistory } from 'react-router';
import '../../../assets/css/admin/common/topbar.css';

class Topbar extends React.Component{
    constructor(props) {
        super(props);
    }
    handleCommand(cmd){
        var that = this;
        if(cmd !== 'logout') return;
        API.logout().then(res=>{
            that.props.setToast(res.msg || '退出成功');
            if(localStorage['__bestToken__']) delete localStorage['__bestToken__'];
            localStorage['__bestLogin__'] && delete localStorage['__bestLogin__'];
            that.props.setToken('');
            that.props.setLogin(false);
            browserHistory.push('/');
        });
    }
    render(){
        return(
            <div className="topbar">
                <div className="left color-white" onClick={this.props.setToggleSidebar.bind(this)}>
                    B<span>est</span>
                </div>
                <div className="right">
                    <Dropdown trigger="click" onCommand={this.handleCommand.bind(this)} menu={(
                        <Dropdown.Menu>
                            <Dropdown.Item command="logout">退出</Dropdown.Item>
                        </Dropdown.Menu>
                    )}>
                        <div className="avatar">
                            <img src={require('../../../assets/img/avatar.png')} />
                        </div>
                    </Dropdown>
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
const mapDispatchProps = dispatch=>{
    return{
        setToggleSidebar:()=>dispatch(setToggleSidebar()),
        setToast:(msg)=>dispatch(setToast(msg)),
        setToken:(token)=>dispatch(setToken(token)),
        setLogin:(bool)=>dispatch(setLogin(bool))
    }
}

export default connect(mapStateProps, mapDispatchProps)(Topbar);
