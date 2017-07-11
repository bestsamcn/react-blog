import React from 'react';
import { Button, Table, MessageBox } from 'element-react';
import { setToast } from '../../../store/actions';
import { connect } from 'react-redux';
import * as API from '../../../api';

class AdminCategory extends React.Component{
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            categoryList:[],
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
                                <Button type="danger" onClick={()=>_this.delCategory(data)}>删除</Button>
                                <Button type="info" onClick={()=>_this.editCategory(data)}>编辑</Button>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    getList(){
        API.getCategoryList().then(res=>{
            this.setState({categoryList:res.data})
        });
    }
    addCategory(bool){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.addCategory({name:value}).then(res=>{
                that.state.categoryList.unshift(res.data);
                that.setState({categoryList: that.state.categoryList});
            })
        }).catch(()=>{})
    }
    delCategory(item){
        var that = this;
        MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning'
        }).then(() => {
            API.delCategory({id:item._id}).then(res=>{
                that.state.categoryList.splice(that.state.categoryList.indexOf(item), 1);
                that.setState({categoryList:that.state.categoryList});
            });
        }).catch(()=>{});
    }
    editCategory(item){
        var that = this;
        MessageBox.prompt('请输入名称', '提示', {
            inputErrorMessage: '邮箱格式不正确',
            inputPlaceholder:item.name
        }).then(({ value }) => {
            if(!value){
                return that.props.setToast('名称不能为空');
            }
            API.editCategory({id:item._id, name:value}).then(res=>{
                that.state.categoryList[that.state.categoryList.indexOf(item)].name = value;
                that.setState({categoryList:that.state.categoryList})
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
                        data={this.state.categoryList}
                        border={true}
                        highlightCurrentRow={true}
                    />
                </div>
                {!this.state.categoryList.length && <p className="text-center margin-top-20">暂无数据</p>}
                <div className="margin-top-20 text-center">
                    <Button type="info" size="large" onClick={()=>this.addCategory(true)}>添加</Button>
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
export default connect(null, mapDispatchProps)(AdminCategory);
