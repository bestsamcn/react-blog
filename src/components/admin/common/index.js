import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setToggleSidebar } from '../../../store/actions';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Breadcrumb } from 'element-react';
import { browserHistory } from 'react-router';
import '../../../assets/css/admin/common/index.css';
import 'element-theme-default';
class AdminCommon extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            routerList:[]
        }
    }
    setBreadCrunb(){
        var _temp = [];
        this.props.routes.map(item=>{
            item.title && _temp.push(item.title);
        });
        this.setState({routerList:_temp});
    }
    componentDidMount() {
        this.setBreadCrunb.bind(this);

    }
    componentWillReceiveProps(next) {
        setTimeout(this.setBreadCrunb.bind(this));
    }
    componentWillMount() {
        setTimeout(this.setBreadCrunb.bind(this));
    }
    render(){
        return(
            <div className={this.props.isHideSidebar ? 'admin-common show-all' : 'admin-common'}>
                <Topbar />
                <Sidebar />
                <div className="content">
                    {!this.props.isHideSidebar && <div className="mask" onClick={this.props.setToggleSidebar.bind(this)}></div>}
                    <div className="admin-map">
                        <i className="icon-map-marker"></i>
                        <Breadcrumb className="map-list" separator="/">
                            {
                                this.state.routerList.map((item, index)=>(
                                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                ))
                            }
                        </Breadcrumb>
                    </div>
                    <div className="content-view">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateProps = (state)=>{
    return{
        isMobile:state.common.isMobile,
        clientHeight:state.common.clientHeight,
        isHideSidebar:state.admin.isHideSidebar,
        breadCrumb:state.admin.breadCrumb
    }
}

const mapDispatchProps = dispatch=>{
    return{
        setToggleSidebar:(isHideSidebar)=>dispatch(setToggleSidebar(isHideSidebar))
    }
}


export default connect(mapStateProps, mapDispatchProps)(AdminCommon);
