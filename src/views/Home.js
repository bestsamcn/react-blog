import React from 'react';
import BFooter from '../components/common/Footer';
import * as API from '../api';
import $$ from '../utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../components/article/ArticleList';
import Category from '../components/home/Category';
import Rank from '../components/home/Rank';
import Hot from '../components/home/Hot';
import Tag from '../components/home/Tag';
import { browserHistory } from 'react-router';
import { setArticleParams } from '../store/actions';

import '../assets/css/home/index.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList:[],
            pageIndex:1,
            pageSize:5,
            isMore:true,
            categoryArticleGroup:[],
            tagArticleGroup:[]
        }
    }
    getArticleList(isRefresh){
        if(!this.state.isMore) return;
        var obj = {
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize
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
            this.scrollBar();
        });
    }
    getDiffArticle(){
        API.getDiffArticle({type:1}).then(res=>{
            this.setState({categoryArticleGroup:res.data});
        });
        API.getDiffArticle({type:2}).then(res=>{
            this.setState({tagArticleGroup:res.data});
        });
    }
    scrollBar(){
        if(this.props.isMobile) return;
        var _body = document.body;
        var el = this.refs.scrollBar;
        var _pNode = el.parentNode;

        // return
        el.slideBar = ()=>{
            //滚动的极限距离
            var h = parseInt(_pNode.offsetHeight) - parseInt(el.offsetHeight)-20;
            var mainOffsetTop = parseInt(_pNode.offseTop);
            var mainHeight = parseInt(_pNode.offsetHeight);
            var slideBarHeight =  parseInt(el.offsetHeight) - 40 ;
            var slideBarIntOffsetTop = 20;
            var slideFunc = function() {
                var scrollTop = parseInt(_body.scrollTop);
                var slideBarOffsetTop = parseInt(el.offsetTop);
                var slideBarTop  = parseInt(el.style.top) || 0;

                //如果侧边栏和主体只差小于侧边栏的原始offsetTop就不滚动
                if(parseInt(h) < slideBarIntOffsetTop){
                    return false;
                }
                // var aniDistant=Math.min( ( Math.max( ( -mainOffsetTop, ( scrollTop - slideBarOffsetTop + slideBarTop)))), (mainHeight - slideBarHeight ) );
                var aniDistant= Math.min(  scrollTop , (mainHeight - slideBarHeight ) );
                //
                if (aniDistant > h) {
                    aniDistant = h
                };
                if (parseInt(_body.scrollTop) > slideBarIntOffsetTop ) {
                    $$.moveStart(el, {'top':aniDistant});
                } else {
                    $$.moveStart(el, {'top':10});
                }
            }
            window.addEventListener('scroll', slideFunc);
            document.addEventListener('resize', slideFunc);
        }
        setTimeout(()=>{
            el.slideBar()
        }, 500)
    }
    componentWillMount() {
        this.getArticleList(true);
        this.getDiffArticle();
    }
    componentDidMount(){
        this.scrollBar();
    }
    goArticleClick(name, type){
        var obj = {
            category:'',
            tag:'',
            isFromHome:true
        }
        obj[type] = name;
        this.props.setArticleParams(obj)
        setTimeout(()=>{
            browserHistory.push('/article');
        })
    }
    render(){
        return (
            <div className="home">
                <div className="main">
                    {this.props.isMobile && <Hot />}
                    <div className="wrapper">
                        <div className="left-cont">
                            <ArticleList onLoadMore={()=>this.getArticleList(false)} isShowMore={true} isMobile={this.props.isMobile} isMore={this.state.isMore} articleList={this.state.articleList} />
                        </div>
                        {!this.props.isMobile && <div className="right-bar sm-hide" ref="scrollBar">
                            <Category onCateClick={this.goArticleClick.bind(this)} categoryArticleGroup={this.state.categoryArticleGroup}>
                                <div className="title color-black">
                                    分类
                                </div>
                            </Category>
                            <Rank latestList={this.state.articleList.slice(0, 4)} />
                            <Tag tagArticleGroup={this.state.tagArticleGroup} onTagClick={this.goArticleClick.bind(this)}>
                                <div className="title color-black">
                                    标签
                                </div>
                            </Tag>
                        </div>}
                    </div>
                </div>
                <BFooter />
            </div>
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }
}

const mapStateProps = state=>{
    return {
        isMobile:state.common.isMobile
    }
}

const mapDispatchProps = dispatch=>{
    return{
        setArticleParams:(params)=>dispatch(setArticleParams(params))
    }
}

export default connect(mapStateProps, mapDispatchProps)(Home);
