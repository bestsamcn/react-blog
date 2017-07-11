import * as TYPES from './action-types';
import * as API from '../../api';

export const setLogin = isLogin=>{
    return {
        type:TYPES.SET_LOGIN,
        isLogin
    }
}

export const setToken = token=>{
    return {
        type:TYPES.SET_TOKEN,
        token
    }
}

export const delToken = ()=>{
    return {
        type:TYPES.DEL_TOKEN
    }
}
export const setBreadCrumb = (breacdCrumb)=>{
    return {
        type:TYPES.SET_BREADCRUMB,
        breacdCrumb
    }
}


export const setLoading = isLoading=>{
    return {
        type:TYPES.SET_LOADING,
        isLoading
    }
}

export const setMobile = isMobile=>{
    return {
        type:TYPES.SET_MOBILE,
        isMobile
    }
}

export const setClientHeight = clientHeight=>{
    return {
        type:TYPES.SET_CLIENT_HEIGHT,
        clientHeight
    }
}

const closeToast = ()=>{
    return {
        type:TYPES.SET_TOAST,
        msg:''
    }
}


export const setToast = msg=>{
    return[
        {
            type:TYPES.SET_TOAST,
            msg
        },(dispatch, getState)=>{
            setTimeout(()=>{
                dispatch(closeToast())
            }, 2000)
        }
    ]
}

export const setToggleMenu = ()=>{
    return {
        type:TYPES.SET_TOGGLE_MENU
    }
}

export const setArticleParams = articleParams=>{
    return {
        type:TYPES.SET_ARTICLE_PARAMS,
        articleParams
    }
}

const setHotWordList = (hotWordList)=>{
    return {
        type:TYPES.GET_HOT_WORD_LIST,
        hotWordList
    }
}

export const getHotWordList = ()=> (dispatch, getState)=>{
    API.getHotWordList().then(res=>{
        dispatch(setHotWordList(res.data));
    });
}

export const setHotWord = params=>{
    return {
        type:TYPES.SET_HOT_WORD,
        params
    }
}

//admin
export const setToggleSidebar = (isHideSidebar)=>{
    return {
        type:TYPES.SET_TOGGLE_SIDEBAR,
        isHideSidebar
    }
}



