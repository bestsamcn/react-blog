import * as TYPES from '../actions/action-types';
let initState={
    isHideSidebar:false,
    categoryList:[],
    tagList:[],
    isAddArticle:false,
    breadCrumb:[]
}
const admin = (state = initState, action)=>{
    switch(action.type){
        case TYPES.SET_TOGGLE_SIDEBAR:
            let _iShowMenu = action.isHideSidebar || !state.isHideSidebar;
            return Object.assign({}, state, {isHideSidebar: _iShowMenu});
        case TYPES.SET_BREADCRUMB:

            let _breadCrumb = action.breadCrumb || ['管理'];
            return Object.assign({}, state, {breadCrumb: _breadCrumb});
        default:
            return state
    }
}

export default admin;
