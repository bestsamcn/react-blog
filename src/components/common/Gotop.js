import React from 'react';
import { SHOW_TOP_DISTANT } from '../../api/config';
import $$ from '../../utils';
import '../../assets/css/common/gotop.css';
class Gotop extends React.Component{
	constructor(props){
		super(props)
	}
	backTop(){
		var nScrollTop, nClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var el = this.refs.btn;
		var elClass=el.className;
        el.temp = ()=>{
        	nScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	        if (nScrollTop > SHOW_TOP_DISTANT) {
	        	el.className="go-top-btn show";
	        } else {
	        	el.className="go-top-btn"
	        }
        }
        window.addEventListener('scroll',el.temp);
	}
	goTopClick(){
		setTimeout(()=>{
			$$.toScrollHeight(0, this.refs.btn);
		}, 500)
	}
	componentDidMount(){
		this.backTop();
		this.goTopClick();
	}
	render(){
		return(
			<div className="back-top">
				<a href="javascript:;"  ref="btn" className="go-top-btn">
					<span className="icon-arrow-up"></span>
				</a>
			</div>
		)
	}
}

export default Gotop;