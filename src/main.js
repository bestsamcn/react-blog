import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import router from './router';
import { setLoading, setMobile, setClientHeight, getHotWordList, setToken, setLogin } from './store/actions'
import $$ from './utils';
store.dispatch(setMobile($$.isMobile()));
//全局数据初始化
store.dispatch(setToken(localStorage['__bestToken__'] && JSON.parse(localStorage['__bestToken__'])));
store.dispatch(setLogin(localStorage['__bestLogin__'] && JSON.parse(localStorage['__bestLogin__'])));
store.dispatch(getHotWordList());
store.dispatch(setClientHeight(document.documentElement.clientHeight));
render(
    <Provider store={store}>
       { router }
    </Provider>,
    document.getElementById('app')
)

