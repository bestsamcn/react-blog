import React from 'react';
import PropTypes from 'prop-types';
import Helper from '../../utils/Helper';
import { Link } from 'react-router';
import * as CONFIG from '../../api/config';
import { connect } from 'react-redux';
import * as API from '../../api';
import '../../assets/css/home/rank.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Rank extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeIndex:1,
            pageIndex:1,
            pageSize:4,
            hotList:[],
            commentList:[],
            readNumList:[]
        }
    }
    navClick(i){
        this.setState({
            activeIndex:i
        });
    }
    getHotList(){
        var obj = {
            type:1,
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize
        }
        API.getArticleList(obj).then(res=>{
            this.setState({hotList:res.data});
        });
    }
    getLatestComent(){
        var obj = {
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize
        }
        API.getCommentList(obj).then(res=>{
            this.setState({commentList:res.data});
        });
    }
    getReadNumAritlce(){
        var obj = {
            type:2,
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize
        }
        API.getArticleList(obj).then(res=>{
            this.setState({readNumList: res.data});
        });
    }
    componentWillMount() {
        this.getHotList();
        this.getLatestComent();
        this.getReadNumAritlce();
    }
    render(){
        return (

            <div className="moveup article-rank margin-top-30">
                <div className="tab-list">
                    <a href="javascript:;" className={this.state.activeIndex === 1 && 'active'} onClick={()=>this.navClick(1)}>最火</a>
                    <a href="javascript:;" className={this.state.activeIndex === 2 && 'active'} onClick={()=>this.navClick(2)}>最新</a>
                    <a href="javascript:;" className={this.state.activeIndex === 3 && 'active'} onClick={()=>this.navClick(3)}>评论</a>
                    <a href="javascript:;" className={this.state.activeIndex === 4 && 'active'} onClick={()=>this.navClick(4)}>阅读</a>
                </div>
                <div className="tab-cont">
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 1 && <div className="animated popular">
                        {
                            this.state.hotList.map(item=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className="img">
                                        <div className="img-box">

                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 2 && <div className="animated popular">
                        {
                            this.props.latestList.map(item=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className="img">
                                        <div className="img-box">
                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 3 && <div className="animated popular">
                        {
                            this.state.commentList.map(item=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className="img">
                                        <div className="img-box name">
                                            <span>{Helper.textEllipsis(item.createLog.createName, 3,true)}</span>
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h4>RE:{item.parentComent ? item.parentComment.content : item.article.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                                ))
                            }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 4 && <div className="animated popular">
                        {
                            this.state.readNumList.map(item=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className="img">
                                        <div className="img-box">
                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className="text">
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                                ))
                            }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}
Rank.propTypes = {
    latestList:PropTypes.array.isRequired
}
export default connect()(Rank);
