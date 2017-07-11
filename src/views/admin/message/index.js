import React from 'react';
import { Radio, Table, Button, Tag, Pagination, MessageBox } from 'element-react';
import { PAGE_SIZE } from '../../../api/config';
import Helper from '../../../utils/helper';
import { browserHistory } from 'react-router';
import * as API from '../../../api';
import '../../../assets/css/admin/message/index.css';

class AdminMessage extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            pageIndex:1,
            pageSize:PAGE_SIZE,
            total:0,
            messageList:[],
            type:2,
            columns:[
                {
                    label: "姓名",
                    prop: "name",
                    width: 100
                },
                {
                    label: "邮箱",
                    prop: "email",
                    width: 200
                },
                {
                    label: "日期",
                    prop: "date",
                    width: 200,
                    render:(data)=>{
                        return Helper.dateFormat(data.postTime, 'yyyy-MM-dd hh:mm:ss')
                    }
                },
                {
                    label: "信息",
                    prop: "content",
                },
                {
                    label: "已读",
                    prop: "isRead",
                    width: 80,
                    render:(data)=>{
                        return <Tag type={data.isRead ? 'success' : 'primary'}>{data.isRead ? '是' : '否'}</Tag>
                    }
                },
                {
                    label: "操作",
                    width:200,
                    render: function(data){
                      return (
                        <span>
                         <Button plain={false} type="info" size="small" onClick={()=>_this.goUrl(data._id)}>查看</Button>
                         <Button type="danger" size="small" onClick={()=>_this.delMessage(data._id)}>删除</Button>
                        </span>
                      )
                    }
                }
            ]
        }
    }
    radioChange(key, value){
        this.setState({
            [key]:value,
            pageIndex:1
        }, this.getList);
    }
    goUrl(id){
        browserHistory.push(`/admin/home/message/detail/${id}`)
    }
    delMessage(_id){
        var that = this;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delMessage({id:_id}).then(res=>{
                for(var i=0; i< that.state.messageList.length; i++){
                    if(that.state.messageList[i]._id == _id){
                        that.state.messageList.splice(i, 1);
                        that.setState({messageList: that.state.messageList});
                        break;
                    }
                }
            });
        }).catch(()=>{});
    }
    getList(_pageIndex){
        _pageIndex = _pageIndex || this.state.pageIndex;
        var obj = {
            pageIndex:_pageIndex,
            pageSize:this.state.pageSize,
            type:this.state.type
        }
        API.getMessageList(obj).then(res=>{
            this.setState({messageList:res.data, total:res.total});
        });
    }
    onCurrentChange(_pageIndex){
        this.setState({pageIndex:_pageIndex}, this.getList);
    }
    componentWillMount(){
        this.getList();
    }
    render(){
        return(
            <div className="admin-message">
                <div className="margin-bottom-20">
                        <Radio.Group value={this.state.type} onChange={this.radioChange.bind(this, 'type')}>
                            <Radio.Button value={2}>未读</Radio.Button>
                            <Radio.Button value={3}>全部</Radio.Button>
                            <Radio.Button value={1}>已读</Radio.Button>
                        </Radio.Group>
                </div>
                <div className="text-center margin-top-20">
                    <Table
                        style={{width: '100%'}}
                        columns={this.state.columns}
                        data={this.state.messageList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.messageList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="block text-center margin-top-20">
                    <Pagination layout="prev, pager, next, jumper" onCurrentChange={this.onCurrentChange.bind(this)} total={this.state.total} pageSize={this.state.pageSize} currentPage={this.state.pageIndex}/>
                </div>
            </div>
        )

    }
}

export default AdminMessage;
