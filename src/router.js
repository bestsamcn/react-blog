import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from  './App';
import Home from './views/Home';
import Search from './views/Search';
import Message from './views/Message';
import About from './views/About';

import Aritlce from './views/article';
import ArticleDetail from './views/article/detail';


//admin
import Admin from './components/admin';
import Signin from './views/admin/Signin';

import AdminCommon from './components/admin/common';
import AdminHome from './views/admin';
import AdminMessage from './views/admin/message';
import AdminMessageDetail from './views/admin/message/Detail';
import AdminCount from './views/admin/Count';
import AdminTag from './views/admin/others/Tag';
import AdminCategory from './views/admin/others/Category';
import AdminHot from './views/admin/others/Hot';
import AdminArticle from './views/admin/article';
import AdminComment from './views/admin/article/Comment';
import AdminAddArticle from './views/admin/article/Add';
import AdminEditArticle from './views/admin/article/Edit';

import store from './store';

import './assets/css/common/base.css';
import './assets/libs/Font-Awesome-3.2.1/css/font-awesome.min.css';
let authCheck = (nextState, replace, next)=>{
    let isLogin = store.getState().common.isLogin;
    if(!isLogin){
        replace('/admin/signin');
    }
    next()
}
let changeRoute = (nextState, replace, next)=>{
    let isLogin = store.getState().common.isLogin;
    if(isLogin){
        replace('/admin/home');
    }
    next()
}
const router = (
    <div>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute title="首页" component={Home} />
                <Route path="/" title="首页" component={Home} />
                <Route path="/search" title="搜索" component={Search} />
                <Route path="/article" title="文章" component={Aritlce} />
                <Route path="/about" title="关于" component={About} />
                <Route path="/article/detail/:id" title="文章详情" component={ArticleDetail} />
                <Route path="/message" title="留言" component={Message}/>
                <Route path="/admin" title="管理" component={Admin}>
                    <IndexRoute title="登录" component={Signin} />
                    <Route path="signin" title="登录" component={Signin} onEnter={changeRoute}/>
                    <Route path="home" component={AdminCommon}  onEnter={authCheck}>
                        <IndexRoute title="首页" component={AdminHome} />
                        <Route path="message" title="留言"  component={AdminMessage} />
                        <Route path="message/detail/:id" title="留言详情"  component={AdminMessageDetail} />
                        <Route path="count" title="访问"  component={AdminCount} />
                        <Route path="tag" title="标签"  component={AdminTag} />
                        <Route path="category" title="分类"  component={AdminCategory} />
                        <Route path="hot" title="热词"  component={AdminHot} />
                        <Route path="article" title="文章"  component={AdminArticle} />
                        <Route path="article/comment" title="文章评论"  component={AdminComment} />
                        <Route path="article/add" title="添加文章"  component={AdminAddArticle} />
                        <Route path="article/edit/:id" title="编辑文章"  component={AdminEditArticle} />
                    </Route>
                </Route>
            </Route>
        </Router>
    </div>
)

export default router;

