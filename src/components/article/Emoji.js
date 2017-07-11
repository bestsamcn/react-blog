import React from 'react';
import PropTypes from 'prop-types';
import { FACE_URL } from '../../api/config';
import '../../assets/css/article/emoji.css';

class Emoji extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			emojiList:[]
		}
	}
	init(){
		let _emojiList = [];
		for(var i=1; i<=48; i++){
			_emojiList.push(i);
		}
		this.setState({emojiList:_emojiList});
	}
	render(){
		return(
			<div className="emoji">
				{
					this.state.emojiList.map((item, index)=>(
						<a className="javascript:;" onClick={this.props.onFaceClick.bind(this, item)} key={index}>
							<img src={`${FACE_URL}/${item}.png`} />
						</a>
					))
				}
				
			</div>
		)
	}
	componentWillMount(){
		this.init();
	}
}

Emoji.propTypes = {
	onFaceClick:PropTypes.func.isRequired
}

export default Emoji;