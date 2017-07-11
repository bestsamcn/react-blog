import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setHotWord } from '../../store/actions';
import { browserHistory } from 'react-router';
import '../../assets/css/home/hot.css';

class Hot extends React.Component{
    hotClick(name){
        var obj = {
            isFromHotWord:true,
            name:name
        }
        this.props.setHotWord(obj);
        setTimeout(()=>{
            browserHistory.push('/search');
        });
    }
    render(){
        return(
            <div className="hots">
                <div className="cont">
                    <div className="wrapper">
                        {
                            this.props.hotWordList.map((item, index)=>(
                                <a className="hot-item" key={item._id && index} onClick={()=>this.hotClick(item.name)}>
                                   {item.name}
                                </a>
                            ))
                        }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProp = state=>{
    return{
        hotWordList:state.common.hotWordList
    }
}
const mapDispatchProp = dispatch=>{
    return{
        setHotWord:(params)=>dispatch(setHotWord(params))
    }
}

export default connect(mapStateProp, mapDispatchProp)(Hot);
