import React from 'react';
import { Radio, Table, Button, Tag, Pagination, Input } from 'element-react';
import { PAGE_SIZE } from '../../api/config';
import Helper from '../../utils/helper';
import * as API from '../../api';
import '../../assets/css/admin/count/index.css';

class AdminCount extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            pageIndex:1,
            pageSize:PAGE_SIZE,
            total:0,
            keyword:'',
            countList:[],
            type:3,
            columns:[
                {
                    label: "ip地址",
                    prop: "accessip",
                    width: 200
                },
                {
                    label: "地址",
                    prop: "address",
                    width: 200,
                    render:(data)=>{
                        return (
                            <div>
                                {data.address.country && <Tag type="success">{data.address.country}</Tag>}
                                {data.address.province && <Tag type="success">{data.address.province}</Tag>}
                                {data.address.city && <Tag type="success">{data.address.city}</Tag>}
                            </div>
                        )
                    }
                },
                {
                    label: "时间",
                    prop: "createTime",
                    width: 200,
                    render:(data)=>{
                        return Helper.dateFormat(data.createTime, 'yyyy-MM-dd hh:mm:ss')
                    }
                },
                {
                    label: "记录",
                    prop: "apiName",
                },
                {
                    label: "操作",
                    width:200,
                    render: function(data){
                      return (
                        <span>
                         <Button type="danger" onClick={()=>_this.delCount(data)} size="small">删除</Button>
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
    getList(_pageIndex){
        _pageIndex = _pageIndex || this.state.pageIndex;
        var obj = {
            pageIndex:_pageIndex,
            keyword:this.state.keyword,
            pageSize:this.state.pageSize,
            type:this.state.type
        }
        API.getAccessList(obj).then(res=>{
            this.setState({countList:res.data, total:res.total});
        });
    }
    keywordChange(val){
        this.setState({keyword:val})
    }
    searchClick(){
        this.setState({pageIndex:1}, this.getList);
    }
    onCurrentChange(_pageIndex){
        this.setState({pageIndex:_pageIndex}, this.getList);
    }
    resetState(){
        this.setState({
            pageIndex:1,
            pageSize:PAGE_SIZE,
            total:0,
            keyword:'',
            type:3,
        }, this.getList);
    }
    delCount(item){
        if(!item._id || item._id.length !== 24) return;
        API.delAccess({id:item._id}).then(res=>{
            this.state.countList.splice(this.state.countList.indexOf(item), 1);
            this.setState({countList:this.state.countList});
        });
    }
    componentWillMount(){
        this.getList()
    }
    render(){
        return(
            <div className="admin-count">
                <div className="margin-bottom-20">
                        <Radio.Group value={this.state.type} onChange={this.radioChange.bind(this, 'type')}>
                            <Radio.Button value={3}>今天</Radio.Button>
                            <Radio.Button value={1}>全部</Radio.Button>
                            <Radio.Button value={2}>昨天</Radio.Button>
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
                        style={{width:"initial"}}
                        columns={this.state.columns}
                        data={this.state.countList}
                        border={true}
                        highlightCurrentRow={true}
                        onCurrentChange={item=>{console.log(item)}}
                    />
                </div>
                {!this.state.countList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="block text-center margin-top-20">
                    <Pagination layout="prev, pager, next, jumper" onCurrentChange={this.onCurrentChange.bind(this)} total={this.state.total} pageSize={this.state.pageSize} currentPage={this.state.pageIndex}/>
                </div>
            </div>
        )

    }
}

export default AdminCount;
