import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as API from '../api';
import $$ from '../utils';
import xss from 'xss';
import { setToast } from '../store/actions';
import '../assets/css/message/index.css';

class Message extends  React.Component{
    postMessage(e){
        e.preventDefault();
        let form = this.refs.form;
        if(!form.name.value){
            return this.props.setToast('昵称不能为空');
        }
        if(!form.email.value){
            return this.props.setToast('邮箱不能为空');
        }
        if(!form.content.value){
            return this.props.setToast('留言不能为空');
        }
        form.content.value = xss(form.content.value);
        let obj = {
            name:form.name.value,
            email:form.email.value,
            content:form.content.value
        }
        API.addMessage(obj).then(res=>{
            form.name.value = '';
            form.email.value = '';
            form.content.value = '';
        });
    }
    render(){
        return(
            <div className="message">
                <h2 className="color-black">CONTACT</h2>
                <form className="msg-form" ref="form">
                    <h4 className="color-black">Name</h4>
                    <input type="text" name="name"></input>
                    <h4 className="color-black">Email</h4>
                    <input type="text" name="email"></input>
                    <h4 className="color-black">Message</h4>
                    <textarea type="textarea"  name="content"></textarea>
                    <button className="button con-share-alt" type="info" onClick={this.postMessage.bind(this)}>发送</button>
                </form>
            </div>
        )
    }
}

const mapDispatchProps = (dispatch)=>{
    return{
        setToast:(msg)=>dispatch(setToast(msg))
    }
}


export default connect(null, mapDispatchProps)(Message);
