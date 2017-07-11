import React from 'react';
import { Button, Table, MessageBox } from 'element-react';
import { setToast } from '../../../store/actions';
import { connect } from 'react-redux';
import Helper from '../../../utils/helper';
import * as API from '../../../api';

class AdminHotWord extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            hotWordList:[],
            columns:[
                {
                    label:'名称',
                    prop:'name',
                },
                {
                    label:'热度',
                    prop:'hotCount',
                },
                {
                    label:'时间',
                    prop:'createTime',
                    render:(data)=>{
                        return Helper.dateFormat(data.createTime, 'yyyy-MM-dd hh:mm:ss')
                    }
                },
                {
                    label:'操作',
                    width:200,
                    render(data){
                        return(
                            <div>
                                <Button type="danger" onClick={()=>_this.delHotWord(data)}>删除</Button>
                                <Button type="info" onClick={()=>_this.editHotWord(data)}>编辑</Button>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    getList(){
        API.getHotWordList().then(res=>{
            this.setState({hotWordList:res.data})
        });
    }
    addHotWord(bool){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.addHotWord({name:value}).then(res=>{
                that.state.hotWordList.unshift(res.data);
                that.setState({hotWordList: that.state.hotWordList});
            })
        }).catch(()=>{})
    }
    delHotWord(item){
        var that = this;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delHotWord({id:item._id}).then(res=>{
                that.state.hotWordList.splice(that.state.hotWordList.indexOf(item), 1);
                that.setState({hotWordList:that.state.hotWordList});
            });
        }).catch(()=>{});
    }
    editHotWord(item){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确',
            inputPlaceholder:item.name
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.editHotWord({id:item._id, name:value}).then(res=>{
                that.state.hotWordList[that.state.hotWordList.indexOf(item)].name = value;
                that.setState({hotWordList:that.state.hotWordList})
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
                        data={this.state.hotWordList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.hotWordList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="margin-top-20 text-center">
                    <Button type="info" size="large" onClick={()=>this.addHotWord(true)}>添加</Button>
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
export default connect(null, mapDispatchProps)(AdminHotWord);
