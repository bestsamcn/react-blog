import React from 'react';
import {Table, Button, Tag, Pagination, Input, MessageBox } from 'element-react';
import { PAGE_SIZE } from '../../../api/config';
import Helper from '../../../utils/helper';
import { browserHistory } from 'react-router';
import * as API from '../../../api';
import '../../../assets/css/admin/article/index.css';

class AdminArticle extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            pageIndex:1,
            pageSize:PAGE_SIZE,
            total:0,
            articleList:[],
            columns:[
                {
                    label: "日期",
                    prop: "createTime",
                    width: 100,
                    render:(data)=>{
                        return Helper.dateFormat(data.createTime, 'yyyy-MM-dd hh:mm:ss')
                    }
                },
                {
                    label: "标题",
                    prop: "title",
                    width: 200
                },
                {
                    label: "摘要",
                    width:300,
                    prop: "previewText",
                },
                {
                    label: "标签",
                    render:(data)=>{
                        return <Tag type="success">{data.tag.name}</Tag>
                    }
                },
                {
                    label: "归类",
                    render:(data)=>{
                        return <Tag type="success">{data.category.name}</Tag>
                    }
                },
                {
                    label: "操作",
                    width:200,
                    render: function(data){
                      return (
                        <span>
                            <Button plain={false} type="info" size="small" onClick={()=>_this.goDetail(data._id)}>查看</Button>
                            <Button plain={false} type="primary" size="small" onClick={()=>_this.goEdit(data._id)}>编辑</Button>
                            <Button type="danger" size="small" onClick={()=>_this.delArticle(data)}>删除</Button>
                        </span>
                      )
                    }
                }
            ]
        }
    }
    goDetail(id){
        browserHistory.push(`/article/detail/${id}`);
    }
    goEdit(id){
        browserHistory.push(`/admin/home/article/edit/${id}`);
    }
    resetState(){
        this.setState({pageIndex:1, keyword:''}, this.getList);
    }
    keywordChange(val){
        this.setState({keyword:val})
    }
    searchClick(){
        this.setState({pageIndex:1}, this.getList);
    }
    delArticle(item){
        if(!item._id || item._id.length !== 24) return;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delArticle({id:item._id}).then(res=>{
                this.state.articleList.splice(this.state.articleList.indexOf(item), 1);
                this.setState({article:this.state.articleList});
            });
        }).catch(()=>{});
    }

    getList(_pageIndex){
        _pageIndex = _pageIndex || this.state.pageIndex;
        var obj = {
            pageIndex:_pageIndex,
            pageSize:this.state.pageSize,
            keyword:this.state.keyword
        }
        API.getArticleList(obj).then(res=>{
            this.setState({articleList:res.data, total:res.total});
        });
    }
    onCurrentChange(_pageIndex){
        this.setState({pageIndex:_pageIndex}, this.getList);
    }
    componentWillMount(){
        this.getList()
    }
    render(){
        return(
            <div className="admin-article">
                <div className="margin-bottom-20">
                    <Button type="primary" className="margin-left-5" onClick={this.resetState.bind(this)}>重置</Button>
                    <Input
                        icon="search"
                        className="margin-left-5"
                        value={this.state.keyword}
                        onChange={this.keywordChange.bind(this)}
                        placeholder="关键词"
                        onIconClick={this.searchClick.bind(this)}
                    />

                </div>
                <div className="text-center margin-top-20">
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.articleList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.articleList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="block text-center margin-top-20">
                    <Pagination layout="prev, pager, next, jumper" onCurrentChange={this.onCurrentChange.bind(this)} total={this.state.total} pageSize={this.state.pageSize} currentPage={this.state.pageIndex}/>
                </div>
            </div>
        )

    }
}

export default AdminArticle;
