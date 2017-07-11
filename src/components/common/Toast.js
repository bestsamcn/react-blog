import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/common/toast.css';

const Toast = ({msg})=>(
    <div className="animated toast">
        { msg }
    </div>
)
Toast.propTypes = {
    msg:PropTypes.string.isRequired
}
export default Toast;
