import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/css/admin/index.css';

class Admin extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="admin-view" style={{height:this.props.clientHeight}}>
                {this.props.children}
            </div>
        )
    }
}

const mapStateProps = (state)=>{
    return{
        clientHeight:state.common.clientHeight,
    }
}

export default connect(mapStateProps)(Admin);
