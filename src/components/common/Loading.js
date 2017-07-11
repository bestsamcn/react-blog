import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/common/loading.css';
const Loading = ({isLoading})=>{
    return (
        <div className="loading" style={{display: isLoading ? 'block' : 'none'}}>
            <div className="loadMask"></div>
            <div className="loadEffect">
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
            </div>
        </div>
    )
}

Loading.propTypes = {
    isLoading:PropTypes.bool.isRequired
}

export default Loading;
