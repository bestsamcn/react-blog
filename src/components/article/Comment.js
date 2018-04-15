import React from 'react';
import PropTypes from 'prop-types';
import { PAGE_SIZE, FACE_URL } from '../../api/config';
import { connect } from 'react-redux';
import * as API from '../../api';
import Helper from '../../utils/helper';
import { setToast } from '../../store/actions';
import Emoji from './Emoji';
import $$ from '../../utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../assets/css/article/comment.css';

class Comment extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
            email:'',
            content:'',
            parentComment:'',
            isSaveInfo:false,
            pageIndex:1,
            pageSize:PAGE_SIZE,
            commentList:[],
            reply:null,
            isMore:true,
            replyOffsetWidth:0,
            backSpaceTimes:0,
            shouldShowFace:false,
            textFocusStart:0,
            textFocusEnd:0,
            preText:'',
            nexText:'',
            isPressingCtrl:false
		}
	}
	postClick(){
	    if(!this.state.name){
	        this.props.setToast('请先填写用户名');
	        return;
	    }
	    if(!this.state.email){
	        this.props.setToast('请先填写邮箱');
	        return;
	    }
	    if(!this.state.content.replace(/^\s+|\s+$/,'')){
	        this.props.setToast('填写内容');
	        this.setState({content:''});
	        return;
	    }
	    var reg = /(<|\$lt)fa(>|\$gt)([\d]*)(\1\/fa\2)/gi;
	    var __content = this.state.content.replace(reg, ($1, $2, $3, $4)=>{ return $1 = '<img src="'+FACE_URL+'/'+$4+'.png">' })
	    var obj = {
	        article:this.props.article,
	        name:this.state.name,
	        email:this.state.email,
	        content:__content,
	        parentComment:this.state.parentComment
	    }
	    if(!!this.state.reply){
	        obj.parentComment = this.state.reply._id;
	    }
	    API.addComment(obj).then(res=>{
	        this.state.isSaveInfo && this.saveInfo(this);
	        let _commentList = this.state.commentList;
	        _commentList.unshift(res.data);
	        this.setState({
	        	content:'',
	        	parentComment:'',
	        	reply:null,
	        	commentList:_commentList,
	        	replyOffsetWidth:0
	        });
	    });
	}
	refreshList(){
	    // if(this.$route.name !== 'ArticleDetail') return;
	    this.setState({pageIndex:1, isMore:true});
	    this.getList(true);
	}
	saveInfo(_this){
	    if(!_this.state.name){
	        _this.props.setToast('请先填写用户名');
	        return;
	    }
	    if(!_this.state.email){
	        _this.props.setToast('请先填写邮箱');
	        return;
	    }
	    window.localStorage['__postName__'] = _this.state.name;
	    window.localStorage['__email__'] = _this.state.email;
	    window.localStorage['__isSaveInfo__'] = true;
	    _this.setState({isSaveInfo:true});
	}
	getList(isRefresh){
	    if(!this.state.isMore) return;
	    var obj = {
	        pageIndex:this.state.pageIndex,
	        pageSize:this.state.pageSize,
	        id:this.props.article
	    }
	    API.getCommentList(obj).then(res=>{
	    	let _commentList = this.state.commentList.concat(res.data);
	        isRefresh ? this.setState({commentList:res.data}) : this.setState({commentList: _commentList});
	        if(this.state.pageIndex * this.state.pageSize >= res.total){
	            this.setState({isMore:false});
	            return;
	        }
	        let _pageIndex = this.state.pageIndex + 1;
	        this.setState({pageIndex:_pageIndex, isMore:true});
	    });
	}
	likeClick(isLike, item){
	    if(!!$$.getCookie(item._id+'__setLikeComment__')){
	        return this.props.setToast('你已投票，明天再来吧');
	    };
	    var obj = {
	        id:item._id,
	        isLike:isLike
	    }
	    let index = this.state.commentList.indexOf(item);
	    let _commentList = this.state.commentList;
	    API.setCommentLike(obj).then(res=>{
	        !isLike && (item.likeNum --);
	        !!isLike && (item.likeNum ++);
	        _commentList.splice(index, 1, item);
	        this.setState({commentList:_commentList});
	        $$.setCookie(item._id+'__setLikeComment__', true, 1);
	    });
	}
	replyClick(item){
	    // this.content = '@'+item.createLog.createName+': ';
	    this.setState({reply:item});
	    setTimeout(()=>{
	        var replyName = document.getElementById('reply-name');
	        var messageContent = document.getElementById('message-content');
	        this.setState({replyOffsetWidth:replyName.offsetWidth-10});
	        messageContent && messageContent.blur();
	        messageContent && messageContent.focus();
	    });
	}
	backSpace(e){
	    if(this.state.content.replace(/^\s+|\s+$/,'').length == 0){
	    	//this.state.backSpaceTimes++不行
	    	let _backSpaceTimes = this.state.backSpaceTimes+1;
	        this.setState({backSpaceTimes:_backSpaceTimes});
	    }else{
	        this.setState({backSpaceTimes:0});
	    }
	    if(this.state.backSpaceTimes >=3){
	        this.setState({
	        	reply:null,
	        	backSpaceTimes:0,
	        	replyOffsetWidth:0
	        });
	    }
	}
	getTextFocus(e){
	    var el = e.target;
	    let _textFocusStart = el.selectionStart;
	    let _textFocusEnd = el.selectionEnd;
	    let _preText = this.state.content.substring(0, this.state.textFocusStart);
	    let _nexText = this.state.content.substring(this.state.textFocusEnd);
	    this.setState({
	    	textFocusStart:_textFocusStart,
	    	textFocusEnd:_textFocusEnd,
	    	preText:_preText,
	    	nexText:_nexText
	    });
	    e.keyCode === 8 && this.backSpace(e);
	}
	showFace(){
	    let _shouldShowFace = !this.state.shouldShowFace;
	    this.setState({shouldShowFace:_shouldShowFace});
	}
	onFaceClick(item){
	    var faceText = `<fa>${item}</fa>`;
	    let _content = this.state.preText+faceText+this.state.nexText;
	    let _preText = this.state.preText+faceText;
	    this.setState({content:_content, preText:_preText});
	    if(this.state.isPressingCtrl) return;
	    this.setState({shouldShowFace:false});
	}
	handleCtrl(flag){
	    //vue2 keyup.ctrl没有触发，蛋疼多选表情砍了吧。
	    this.setState({isPressingCtrl:flag});
	}
	filterHtml(str){
	    return str.replace(/<(?!img)[^>]*>/,"");
	}
	componentWillMount(){
        this.setState({
        	name: window.localStorage['__postName__'] || '',
        	email:  window.localStorage['__email__'] || '',
        	isSaveInfo: window.localStorage['__isSaveInfo__'] || false
        })
        this.refreshList();
	}
	setValue(e){
		let obj = {};
		obj[e.target.name] = e.target.value;
		if(e.target.type === 'checkbox' || e.target.type === 'radio') {
			obj[e.target.name] = e.target.checked;
		}
		this.setState(obj);
	}
	render(){
		return(
			<div className="comment">
		        <div className="comment-form">
		            <ul>
		                <li>
		                    <input type="text" name="name" value={this.state.name} onChange={this.setState.bind(this)} placeholder="你的昵称" />
		                </li>
		                <li>
		                    <input type="text" name="email" onChange={this.setState.bind(this)}  value={this.state.email} placeholder="请填写有效邮箱，否则无法收到回复通知" />
		                </li>
		                <li style={{position:'relative'}}>
		                    {this.state.reply && <span id="reply-name">@{this.state.reply.createLog.createName}: </span>}
		                    <textarea onChange={this.setValue.bind(this)} value={this.state.content} onMouseUp={this.getTextFocus.bind(this)} onMouseDown={this.getTextFocus.bind(this)} onKeyUp={this.getTextFocus.bind(this)} onKeyDown={this.getTextFocus.bind(this)} onFocus={this.getTextFocus.bind(this)} onBlur={this.getTextFocus.bind(this)} placeholder={this.state.replyOffsetWidth ? '' : '回复内容'} id="message-content" style={{textIndent:this.state.replyOffsetWidth+'px'}}  name="content" cols="30" rows="10">
		                    </textarea>
		                </li>
		                <li className="others-bar">
		                    <label>
		                        <input type="checkbox" onChange={this.setValue.bind(this)} value={this.state.isSaveInfo} checked={!!this.state.isSaveInfo} name="isSaveInfo" />
		                        <span className="icon-check-empty">记住评论信息</span>
		                    </label>
		                    <a href="javascript:;" className="face icon-github-alt" onClick={this.showFace.bind(this)}>表情</a>
		                    <button onClick={this.postClick.bind(this)} className="sub-btn">提交</button>
		                    <ReactCSSTransitionGroup
		                    	transitionEnter={true}
		                        transitionLeave={true}
		                        transitionEnterTimeout={300}
		                        transitionLeaveTimeout={200}
		                        transitionName="fadeInLeft"
		                    >
		                    {this.state.shouldShowFace && <Emoji onFaceClick={this.onFaceClick.bind(this)} />}
		                    </ReactCSSTransitionGroup>
		                </li>
		            </ul>
		        </div>

		        <div className="comment-list">
		        	{
			        	this.state.commentList.map((item, index)=>(
				            <div className="comment-item" key={item._id && index}>
				                <div className="favor">
				                    <a href="javascript:;" onClick={()=>this.likeClick(1, item)} className="icon-sort-up up"></a>
				                    <span>{item.likeNum}</span>
				                    <a href="javascript:;" onClick={()=>this.likeClick(0, item)} className="icon-sort-down down"></a>
				                </div>
				                <div className="cont">
				                    <h4 className="title text-left">
				                        {item.createLog.createName}：
				                    </h4>

				                    {!!item.parentComment && <p className="quote">@{item.parentComment.createLog.createName}：<span dangerouslySetInnerHTML={{__html:this.filterHtml(item.parentComment.content)}}></span></p>}
				                    <p className="text text-left color-black margin-top-5 curr-text" dangerouslySetInnerHTML={{__html:this.filterHtml(item.content)}}>
				                    </p>
				                    <div className="operate text-left margin-top-10">
				                        <a className="color-gray font-12 icon-time">{Helper.dateDesc(item.createLog.createTime)}</a>
				                        <a href="javascript:;" className="text-left color-gray font-12 icon-comment" onClick={()=>this.replyClick(item)}>回复</a>
				                    </div>
				                </div>
				            </div>
			            ))
		           	}
		        </div>
		        <div style={{padding:'20px 0'}}>
		        	{!this.state.isMore && <p className="text-center margin-top-10 padding-bottom-20 margin-bottom-20 color-gray">没有更多了...</p>}
		        	{this.state.isMore && <a href="javascript:;" onClick={this.getList.bind(this, false)} className="more-btn md-hide">More</a>}
		        </div>
		    </div>
		)
	}
}

const mapDispatchProps = (dispatch)=>{
	return {
		setToast:(msg)=>dispatch(setToast(msg))
	}
}
Comment.propTypes = {
	article:PropTypes.string.isRequired
}

export default connect(null, mapDispatchProps)(Comment);