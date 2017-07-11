import React from 'react';
import * as API from '../../../api';
import '../../../assets/css/admin/message/index.css'

class AdminMessageDetail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			id:'',
			message:{}
		}
	}
	getDetail(){
		var that = this;
		API.getMessageDetail({id:that.props.params.id}).then(res=>{
			that.setState({message:res.data, id:res.data._id});
		});
	}
	componentWillMount(){
		this.getDetail();
	}
	componentWillReceiceProps(){
		setTimeout(this.getDetail.bind(this));
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.params.id !== this.state.id;
	}
	render(){
		return(
			<div className="admin-message">
				<div className="info color-blue">
					<div className="block">昵称：<span>{this.state.message.name}</span></div>
					<div className="block">邮箱：<span>{this.state.message.email}</span></div>
					<div className="block">时间：<span>{this.state.message.postTime}</span></div>
				</div>
				<p className="margin-top-20 message-content">{this.state.message.content}</p>
			</div>
		)
	}
}
export default AdminMessageDetail;