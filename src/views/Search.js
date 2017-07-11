import React from 'react';
import BFooter from '../components/common/Footer';
import * as API from '../api';
import $$ from '../utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { PAGE_SIZE } from '../api/config';
import ArticleList from '../components/article/ArticleList';
import '../assets/css/search/index.css';


class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pageIndex:1,
			pageSize:PAGE_SIZE,
			articleList:[],
			isMore:true,
            keyword:'',
            isCache:false
		}
	}
	getSearchList(isRefresh){
        if(!this.state.isMore) return;
        var obj = {
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            keyword:this.state.keyword
        }
        API.getArticleList(obj).then(res=>{
            res.data.map(item=>{
                if($$.getCookie(item._id)){
                    return item.isLiked = true;
                }else{
                    return item.isLiked = false;
                }
            });
            if(isRefresh){
                this.setState({
                    articleList:res.data
                });
            }else{
                this.setState({
                    articleList:this.state.articleList.concat(res.data)
                });
            }
            if(this.state.pageIndex * this.state.pageSize >= res.total){
                this.setState({
                    isMore:false
                });
            }else{
                let _pageIndex = this.state.pageIndex + 1;
                this.setState({
                    pageIndex:_pageIndex,
                    isMore:true
                });
            }
            this.setState({isFirst:false});
        });
    }
    setKeyword(e){
        let value = e.target.value;
        this.setState({keyword:value});
    }
    keywordEnter(e){
        if(e.keyCode === 13){
            this.setState({isMore:true, pageIndex:1}, ()=>{this.getSearchList(true);});
        }
        return false;
    }
    componentWillMount() {
        if(this.props.hotWord && this.props.hotWord.isFromHotWord && this.props.hotWord.name){
            this.setState({keyword: this.props.hotWord.name}, ()=>{
                if(!this.state.isCache) this.getSearchList(true);
            });
            return;
        }
        this.getSearchList(true);
        // console.log(this.state.isCache)
    }
	render(){
		return(
			<div className="search">
		        <div className="wrapper">
		            <div className="moveup search-bar sm-100">
		                <form style={{width:'100%'}} noValidate action="javascript:;">
		                    <input type="search" name="search" placeholder="搜索" value={this.state.keyword} onChange={this.setKeyword.bind(this)} onKeyDown={this.keywordEnter.bind(this)} className="search-input" />
		                </form>
		                <i className="icon-search search-btn"></i>
		            </div>
		            <div className="margin-top-20">
		                <ArticleList onLoadMore={()=>this.getSearchList(false)} isMobile={this.props.isMobile} isShowMore={true} className="padding-0 border-top-1" isMore={this.state.isMore} articleList={this.state.articleList} />
		            </div>
		        </div>
		        <BFooter className="margin-top-20" />
		    </div>
		)
	}
}


const mapStateProps = state=>{
    return {
        isMobile:state.common.isMobile,
        hotWord:state.common.hotWord
    }
}

export default connect(mapStateProps)(Search);
