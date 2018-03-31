import React from 'react';
import { browserHistory } from 'react-router';
import * as API from '../../api';
import '../../assets/css/admin/home/index.css';

class AdminHome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            todayComment:0,
            accessTodayTotal:0,
            unreadMessageTotal:0
        }
    }
    goUrl(url){
        browserHistory.push(url)
    }
    initState(){
        var that = this;
        API.getPreviewTotal().then(res=>{
            that.setState({
                todayComment:res.data.todayComment,
                accessTodayTotal:res.data.accessTodayTotal,
                unreadMessageTotal:res.data.unreadMessageTotal
            })
        });
    }
    componentDidMount(){
        this.initState();
    }
    render(){
        return(
            <div className="admin-home">
                <div className="preview">
                    <div className="prev-item bg-green" onClick={()=>this.goUrl('/admin/home/count')}>
                        <h4>今天访问</h4>
                        <p className="text-center color-white margin-top-20">{this.state.accessTodayTotal}</p>
                    </div>
                    <div  className="prev-item bg-red" onClick={()=>this.goUrl('/admin/home/article/comment')}>
                        <h4>今天评论</h4>
                        <p className="text-center color-white margin-top-20">{this.state.todayComment}</p>
                    </div>
                    <div className="prev-item bg-blue" onClick={()=>this.goUrl('/admin/home/message')}>
                        <h4>未读消息</h4>
                        <p className="text-center color-white margin-top-20">{this.state.unreadMessageTotal}</p>
                    </div>

                </div>
            </div>
        )
    }
}


export default AdminHome;
