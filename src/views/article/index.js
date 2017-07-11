import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';
import Footerbar from '../../components/common/Footer';
import { PAGE_SIZE } from '../../api/config';
import { setArticleParams } from '../../store/actions';
import $$ from '../../utils';
import '../../assets/css/article/index.css';
import * as API from '../../api';

class Article extends React.Component{
	constructor(props){
		super(props);
		this.state={
			articleList:[],
            pageIndex:1,
            pageSize:PAGE_SIZE,
            tag:'',
            category:'',
            isMore:true
		}
	}
	getList(isRefresh=false){
        if(!this.state.isMore) return;
        var obj = {
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            tag:this.state.tag,
            category:this.state.category
        }
        API.getArticleList(obj).then(res=>{
            if(res.total <= this.state.pageSize * this.state.pageIndex){
                this.setState({isMore:false});
            }else{
                let _pageIndex = this.state.pageIndex + 1;
                this.setState({isMore: true, pageIndex:_pageIndex});
            }
            res.data.map(item=>{
                if($$.getCookie(item._id)){
                    return item.isLiked = true;
                }else{
                    return item.isLiked = false;
                }
            });
            let _articleList = this.state.articleList.concat(res.data);
            isRefresh ? this.setState({articleList:res.data}) : this.setState({articleList: _articleList})
        });
    }
    refreshList(){
        this.setState({pageIndex:1, isMore:true}, ()=>this.getList(true));
    }
    getFromHome(){
        if(this.props.articleParams.isFromHome && (this.props.articleParams.tag || this.props.articleParams.category)){
            let _tag = this.props.articleParams.tag;
            let _category = this.props.articleParams.category;
            let _isMore = true;
            let _pageIndex = 1;
            this.setState({tag:_tag, category:_category, isMore:true, pageIndex:_pageIndex}, ()=>{
                this.props.setArticleParams({isFromHome:false, tag:'', category:''});
                this.getList(true);
            });
        }
    }
	render(){
		return(
			<div className="article">
		        <div className="main">
		            <ArticleList onLoadMore={()=>this.getList(false)} articleList={this.state.articleList} isMore={this.state.isMore} />
		        </div>
		        <Footerbar className="margin-top-20" />
		    </div>
		)
	}
	componentWillMount(){
		if(this.props.articleParams.isFromHome && (this.props.articleParams.tag || this.props.articleParams.category)){
            let _tag = this.props.articleParams.tag;
            let _category = this.props.articleParams.category;
            let _isMore = true;
            let _pageIndex = 1;
            this.setState({tag:_tag, category:_category, isMore:true, pageIndex:_pageIndex}, ()=>{
                this.props.setArticleParams({isFromHome:false, tag:'', category:''});
                this.getList(true);
            });

        }
	}
	componentWillReceiveProps(){
		// this.getFromHome();
	}
}

const mapStateProps = state=>{
	return{
		articleParams:state.common.articleParams
	}
}
const mapDispatchProps = dispatch=>{
	return{
		setArticleParams:(articleParams)=>dispatch(setArticleParams(articleParams))
	}
}

export default connect(mapStateProps, mapDispatchProps)(Article);
