import React from 'react';
import { Radio, Table, Button,  Pagination, Input, MessageBox } from 'element-react';
import { PAGE_SIZE } from '../../../api/config';
import Helper from '../../../utils/helper';
import * as API from '../../../api';
import { browserHistory } from 'react-router';
import '../../../assets/css/admin/article/articleComment.css';

class AdminComment extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            pageIndex:1,
            pageSize:PAGE_SIZE,
            total:0,
            type:1,
            commentList:[],
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
                    label: "文章",
                    prop: "title",
                    width: 200,
                    render:(data)=>{
                        return data.article.title
                    }
                },
                {
                    label: "来自",
                    width:100,
                    render:(data)=>{
                        return data.createLog.createName
                    }
                },
                {
                    label: "邮箱",
                    prop:'email',
                    render:(data)=>{
                        return data.createLog.createEmail
                    }
                },
                {
                    label: "内容",
                    prop:'content'
                },
                {
                    label: "操作",
                    width:200,
                    render: function(data){
                      return (
                        <span>
                            <Button plain={false} type="info" onClick={()=>_this.goDetail(data.article._id)} size="small">查看</Button>
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
    resetState(){
        this.setState({pageIndex:1, keyword:''}, this.getList);
    }
    keywordChange(val){
        this.setState({keyword:val})
    }
    searchClick(){
        this.setState({pageIndex:1}, this.getList);
    }
    delComment(item){
        if(!item._id || item._id.length !== 24) return;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delComment({id:item._id}).then(res=>{
                this.state.commentList.splice(this.state.commentList.indexOf(item), 1);
                this.setState({article:this.state.commentList});
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
        API.getCommentList(obj).then(res=>{
            this.setState({commentList:res.data, total:res.total});
        });
    }
    radioChange(key, value){
        this.setState({
            [key]:value,
            pageIndex:1
        }, this.getList);
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
                    <Radio.Group value={this.state.type} onChange={this.radioChange.bind(this, 'type')}>
                        <Radio.Button value={1}>今天</Radio.Button>
                        <Radio.Button value={0}>全部</Radio.Button>
                    </Radio.Group>
                    <Input
                        icon="search"
                        className="margin-left-5"
                        value={this.state.keyword}
                        onChange={this.keywordChange.bind(this)}
                        placeholder="关键词"
                        onIconClick={this.searchClick.bind(this)}
                    />
                    <Button type="primary" className="margin-left-5" onClick={this.resetState.bind(this)}>重置</Button>
                </div>
                <div className="text-center margin-top-20">
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.commentList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.commentList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="block text-center margin-top-20">
                    <Pagination layout="prev, pager, next, jumper" onCurrentChange={this.onCurrentChange.bind(this)} total={this.state.total} pageSize={this.state.pageSize} currentPage={this.state.pageIndex}/>
                </div>
            </div>
        )

    }
}

export default AdminComment;
