import React from 'react';
import PropTypes from 'prop-types';
require('simplemde/dist/simplemde.min.css');
import '../../../assets/css/common/github-markdown.css';
import Simplemde from 'simplemde';

class Smde extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			configs: {
                status: false, // 禁用底部状态栏
                initialValue: '', // 设置初始值
                autosave:{
                    enabled:true,
                    delay:5000,
                    uniqueId:Date.now()
                },
                renderingConfig: {
                    codeSyntaxHighlighting: true, // 开启代码高亮
                    highlightingTheme: 'atom-one-dark'
                },
                toolbar: ["bold", "italic", "heading", "|", "code", "quote", "unordered-list", "ordered-list", "|", "link", "image", "preview", "|", "side-by-side", "fullscreen", "guide"],
                inputStyle:'contenteditable'
            },
            title:'',
            previewText:'',
            tagChooseList:[],
            cateChooseList:[],
            isEditorFullscreen:false,
            editor:null,
            poster:'',
            isUploading:false,
            isPosterUploading:false
		}
	}
	initSmde(){
		// 判断是否开启代码高亮
      if (this.state.configs.renderingConfig && this.state.configs.renderingConfig.codeSyntaxHighlighting) {
        require.ensure([], () => {
          const theme = this.state.configs.renderingConfig.highlightingTheme || 'default';
          // window.hljs = require('highlight.js');
          require(`highlight.js/styles/${theme}.css`);
        }, 'highlight');
      }

      // 判断是否引入样式文件
      if (!this.state.customTheme) {
        require('simplemde/dist/simplemde.min.css');
      }
    this.state.configs.initialValue = this.state.configs.initialValue || this.props.value;
		this.state.configs.element = this.refs.smde;

		this.setState({configs:this.state.configs});
		this.simplemde = new Simplemde(this.state.configs);
	}
  bindingEvents() {
    this.simplemde.codemirror.on('change', () => {
      this.props.onInput && this.props.onInput(this.simplemde.value());
    });
  }
	componentWillMount(){

	}
	componentDidMount(){
		this.initSmde();
    this.bindingEvents();
	}
	render(){
		return (
			<div className="markdown-editor markdown-body highlight">
			    <textarea  ref="smde"></textarea>
			</div>
		)
	}
}

Smde.propTypes = {
  onInput:PropTypes.func,
  value:PropTypes.string
}

export default Smde;
