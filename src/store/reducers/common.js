import * as TYPES from '../actions/action-types';
import store from '../index';
let initState = {
    token:'',
    isLogin:false,
    isLoading:false,
    isMobile:false,
    msg:'',
    clientHeight:0,
    iShowMenu:false,
    hotWord:{
        isFromHotWord:false,
        name:''
    },
    hotWordList:[],
    articleParams:{category: "前端", tag: "", isFromHome: true}
}

const common = (state = initState, action)=>{
    switch(action.type){
        case TYPES.SET_LOGIN:
            return Object.assign({}, state, {isLogin: action.isLogin});
        case TYPES.SET_TOKEN:
            return Object.assign({}, state, {token: action.token});
        case TYPES.SET_LOADING:
            return Object.assign({}, state, {isLoading: action.isLoading});
        case TYPES.SET_MOBILE:
            return Object.assign({}, state, {isMobile: action.isMobile});
        case TYPES.SET_TOAST:
            return Object.assign({}, state, {msg: action.msg});
        case TYPES.SET_CLIENT_HEIGHT:
            return Object.assign({}, state, {clientHeight: action.clientHeight});
        case TYPES.SET_TOGGLE_MENU:
            let _iShowMenu = !state.iShowMenu;
            return Object.assign({}, state, {iShowMenu: _iShowMenu});
        case TYPES.SET_ARTICLE_PARAMS:
            return Object.assign({}, state, {articleParams: action.articleParams});
        case TYPES.GET_HOT_WORD_LIST:
            return Object.assign({}, state, {hotWordList: action.hotWordList});
        case TYPES.SET_HOT_WORD:
            return Object.assign({}, state, {hotWord: action.params});
        default:
            return state
    }
}

export default common;
