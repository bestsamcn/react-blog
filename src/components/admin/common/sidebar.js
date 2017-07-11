import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as API from '../../../api';
import { connect } from 'react-redux';
import { setToggleSidebar, setToast, delToken } from '../../../store/actions';
import { Menu } from 'element-react';
import { browserHistory, IndexLink } from 'react-router';
import '../../../assets/css/admin/common/sidebar.css';

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }
    goUrl(path){
        return browserHistory.push(path)
    }
    componentDidMount() {
        // this.props.isMobile && this.props.setToggleSidebar(true);
        // !this.props.isMobile && this.props.setToggleSidebar(false);
    }
    render(){
        return(
            <div className={this.props.isHideSidebar ? 'sidebar hide' : 'sidebar'}>
                <Menu onSelect={this.goUrl.bind(this)} mode="vertical">
                    <Menu.Item index="/admin/home">
                        <i className="icon-desktop"></i>主页
                    </Menu.Item>
                    <Menu.SubMenu index="1" title={<span><i className="icon-file-alt"></i>文章</span>}>
                        <Menu.ItemGroup title="">
                            <Menu.Item index="/admin/home/article">
                                <i className="icon-list-alt"></i>文章列表
                            </Menu.Item>
                            <Menu.Item index="/admin/home/article/add">
                                <i className="icon-plus-sign-alt"></i>添加文章
                            </Menu.Item>
                            <Menu.Item index="/admin/home/article/comment">
                                <i className="icon-comments"></i>文章评论
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.SubMenu index="2" title={<span><i className="icon-plus-sign-alt"></i>标签归类</span>}>
                        <Menu.ItemGroup title="">
                            <Menu.Item index="/admin/home/tag">
                                <i className="icon-tags"></i>标签列表
                            </Menu.Item>
                            <Menu.Item index="/admin/home/category" >
                                <i className="icon-paste"></i>分类列表
                            </Menu.Item>
                            <Menu.Item index="/admin/home/hot">
                                <i className="icon-fire"></i>热词列表
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                    <Menu.Item index="/admin/home/message">留言列表</Menu.Item>
                    <Menu.Item index="/admin/home/count">访问记录</Menu.Item>
                </Menu>
                <IndexLink to="/" activeClassName="active" className="bottom-btn"><i className="icon-bold"><span>返回首页</span></i></IndexLink>
            </div>
        )
    }
}

const mapStateProps = state=>{
    return{
        isLogin:state.common.isLogin,
        isMobile:state.common.isMobile,
        isHideSidebar:state.admin.isHideSidebar
    }
}
const mapDispatchProps = dispatch=>{
    return{
        setToggleSidebar:(bool)=>dispatch(setToggleSidebar(bool)),
        setToast:(msg)=>dispatch(setToast(msg))
    }
}


export default connect(mapStateProps, mapDispatchProps)(Sidebar);
