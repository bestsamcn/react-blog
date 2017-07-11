import React from 'react';
import { Button, Table, MessageBox } from 'element-react';
import { setToast } from '../../../store/actions';
import { connect } from 'react-redux';
import * as API from '../../../api';

class AdminTag extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            tagList:[],
            columns:[
                {
                    label:'名称',
                    prop:'name',
                },
                {
                    label:'热度',
                    prop:'clickNum',
                },
                {
                    label:'操作',
                    width:200,
                    render(data){
                        return(
                            <div>
                                <Button type="danger" onClick={()=>_this.delTag(data)}>删除</Button>
                                <Button type="info" onClick={()=>_this.editTag(data)}>编辑</Button>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    getList(){
        API.getTagList().then(res=>{
            this.setState({tagList:res.data})
        });
    }
    addTag(bool){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.addTag({name:value}).then(res=>{
                that.state.tagList.unshift(res.data);
                that.setState({tagList: that.state.tagList});
            })
        }).catch(()=>{})
    }
    delTag(item){
        var that = this;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delTag({id:item._id}).then(res=>{
                that.state.tagList.splice(that.state.tagList.indexOf(item), 1);
                that.setState({tagList:that.state.tagList});
            });
        }).catch(()=>{});
    }
    editTag(item){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确',
            inputPlaceholder:item.name
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.editTag({id:item._id, name:value}).then(res=>{
                that.state.tagList[that.state.tagList.indexOf(item)].name = value;
                that.setState({tagList:that.state.tagList})
            });
        }).catch(()=>{})
    }
    componentWillMount() {
        this.getList();
    }
    render(){
        return(
            <div className="admin-tag">
                <div className="text-center margin-top-20">
                    <Table
                        style={{width:"initial"}}
                        columns={this.state.columns}
                        data={this.state.tagList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.tagList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="margin-top-20 text-center">
                    <Button type="info" size="large" onClick={()=>this.addTag(true)}>添加</Button>
                </div>
            </div>
        )

    }
}

const mapDispatchProps = dispatch=> {
    return{
        setToast:(msg)=>dispatch(setToast(msg))
    }
}
export default connect(null, mapDispatchProps)(AdminTag);
