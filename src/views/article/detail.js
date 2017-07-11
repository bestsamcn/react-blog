import React from 'react';
import { Link } from 'react-router';
import * as API from '../../api';
import { connect } from 'react-redux';
import { setToast } from '../../store/actions';
import $$ from '../../utils';
import Helper from '../../utils/helper';
import Footerbar from '../../components/common/Footer';
import Comment from '../../components/article/Comment';
import '../../assets/css/common/github-markdown.css';
import '../../assets/css/common/atom-one-dark.css';
import '../../assets/css/article/detail.css';
import { browserHistory } from 'react-router'

class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			article:{},
            parseHtml:'',
            editor:null,
            prevID:'',
            nextID:'',
            isLiked:false,
            type:1
		}
	}
	goBack(){
        browserHistory.go(-1)
    }
    getDetail(){
        if(!this.props.params.id) return;
        this.setState({isLiked:false});
        API.getArticleDetail({id:this.props.params.id, type:this.state.type}).then(res=>{
            let _article = res.data.curr;
            let _prevID = res.data.prev && res.data.prev._id || '';
            let _nextID = res.data.next && res.data.next._id || '';
            this.setState({article:_article, prevID:_prevID, nextID:_nextID});
            if($$.getCookie(this.state.article._id)){
                this.setState({isLiked:true});
            }
        });
    }
    likeClick(){
        if($$.getCookie(this.state.article._id)){
            this.props.setToast('已经点赞过啦');
            return;
        }
        API.likeArticle({id:this.state.article._id}).then(res=>{
            $$.setCookie(this.state.article._id, true, 7);
            let _likeNum = this.state.article.likeNum+1;
            this.setState({isLiked:true, article:Object.assign({}, this.state.article, {likeNum: _likeNum})});
        });
    }
	render(){
		return (
			<div className="article-detail">
		        <div className="main">
		            <div className="title">
		                <h4 className="color-black">{ this.state.article.title }</h4>
		                <div className="info margin-top-10">
		                    <span className="icon-calendar">{Helper.dateFormat(this.state.article.createTime, 'yyyy-MM-dd')}</span>
		                    <span className="icon-map-marker">{this.state.article.category && this.state.article.category.name}</span>
		                    <span className="icon-eye-open">{Helper.transNum(this.state.article.readNum)} Views</span>
		                    <span className="icon-tag">{this.state.article.tag && this.state.article.tag.name}</span>
		                    {
		                    	!!this.state.article.lastEditTime && !this.props.isMobile && <span className="icon-edit">{Helper.dateFormat(this.state.article.lastEditTime, 'yyyy-MM-dd hh:mm:ss')}</span>
		                    }
		                    <a href="javascript:;" onClick={this.likeClick.bind(this)} className={this.state.isLiked ? 'icon-heart active' : 'icon-heart'}>{Helper.transNum(this.state.article.likeNum) }</a>
		                </div>
		            </div>
		            <p className="preview">
		                {this.state.article.previewText}
		            </p>
		            <div className="content markdown-body" dangerouslySetInnerHTML={{__html:this.state.article.content}}>
		            </div>
		            <div className="others">
		                <a href="javascript:;" onClick={this.goBack}>返回</a>
		                {this.state.prevID && <Link to={`/article/detail/${this.state.prevID}`}>前篇</Link>}
		                {this.state.nextID && <Link to={`/article/detail/${this.state.nextID}`}>后篇</Link>}
		                <a href="javascript:;" onClick={this.likeClick.bind(this)} className={this.state.isLiked && 'is-liked'}>点赞</a>
		            </div>
		            <Comment className="margin-top-30" article={this.props.params.id} />
		        </div>
		        <Footerbar className="margin-top-20" />
		    </div>
	    )
	}
	componentWillMount(){
		this.getDetail();
	}
	componentWillReceiveProps(){
        setTimeout(this.getDetail.bind(this))
	}
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.params.id !== this.state.article._id;
    }
}

const mapStateProps = state=>{
	return {
		isMobile:state.common.isMobile
	}
}

const mapStateDispatch = (dispatch)=>{
	return {
		setToast:(msg)=>dispatch(setToast(msg))
	}
}
export default connect(null, mapStateDispatch)(Detail);
