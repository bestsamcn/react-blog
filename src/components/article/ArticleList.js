
import React from 'react';
import PropTypes from 'prop-types';
import * as CONFIG from '../../api/config';
import '../../assets/css/article/articleList.css';
import Helper from '../../utils/helper';
import { browserHistory } from 'react-router'
const ArticleList = ({articleList, isMore, isShowMore=true, isMobile, onLoadMore})=>{
    //指令真难搞
    let autoSize = e=>{
        var img = new Image();
        var nimg = e.target;
        img.src= e.target.src;
        img.onload = ee=>{
            var w = ee.path[0].width;
            var h = ee.path[0].height;
            if(w > h){
                nimg.style="height:100%;width:initial";
            }else{
                nimg.style="height:initial;width:100%";
            }
        }
    }
    let goUrl = url=>{
        browserHistory.push(url);
    }
    return (
        <div className="article-list" >
            {
                articleList.map(item=>(
                    <div className={(!!item.poster && !isMobile) ?  'item has-right' : 'item'} onClick={()=>goUrl(`/article/detail/${item._id}`)}  key={item._id}>
                        <div className="left">
                            <div className="title">
                                <h4 className="color-black">{item.title}</h4>
                                <div className="info margin-top-10">
                                    <span className="icon-comment">{item.commentNum } Comments</span>
                                    <span className="icon-eye-open">{item.readNum} Views</span>
                                    <span className="icon-tag">{item.tag ? item.tag.name : 'null'}</span>
                                    <a href="javascript:;" className={ item.isLiked ? 'icon-heart active' : 'icon-heart'}>{item.likeNum}</a>
                                </div>
                            </div>
                            <p className="preview">
                                摘要: {item.previewText}

                            </p>
                            <div className="bottom">
                                <a href="javascript:;" className="more">{item.category ? item.category.name :'我可能被删了'}</a>
                                <a className="icon-calendar more no-border color-gray">{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</a>
                                {item.lastEditTime && <a className="icon-edit more no-border color-gray">{Helper.dateFormat(item.lastEditTime, 'yyyy-MM-dd')}</a>}
                            </div>
                        </div>
                        {
                            !!item.poster && !isMobile && <div className="right">
                                <div className="img">
                                    <img src={CONFIG.POSTER_URL+'/'+item.poster} onLoad={autoSize} />
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            <div className="padding-20-0">
                {isShowMore && isMore && <a href="javascript:;" onClick={onLoadMore} className="more-btn">More</a>}
                {isShowMore && !isMore && <p className="text-center color-gray padding-20-0">没有更多了</p>}
            </div>
        </div>
    )
}

ArticleList.propTypes = {
    articleList:PropTypes.array.isRequired,
    isMore:PropTypes.bool,
    isShowMore:PropTypes.bool,
    isMobile:PropTypes.bool,
    onLoadMore:PropTypes.func
}

export default ArticleList;
