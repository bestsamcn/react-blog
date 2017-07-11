import React from 'react';
import { Button, Select, Input } from 'element-react';
import { connect } from 'react-redux';
import { setToast } from '../../../store/actions';
import * as API from '../../../api';
import * as CONFIG from '../../../api/config';
import { browserHistory } from 'react-router';
import Axios from 'axios';
import Smde from '../../../components/admin/common/Smde';
import '../../../assets/css/admin/article/addArticle.css';


class AdminEditArticle extends React.Component{
	constructor(props){
		super(props);
		var _this = this;
		this.state = {
			id:'',
			isUploading:false,
			isPosterUploading:false,
			tagList:[],
			categoryList:[],
			tagSelected:'',
            categorySelected:'',
            title:'',
            previewText:'',
            poster:'',
            highlightHtml:'',
            type:2
		}
	}
	getArticle(){
        if(!this.props.params.id){
            browserHistory.push('/admin/home/article');
            return;
        }
        var that = this;
        API.getArticleDetail({id:this.props.params.id, type:this.state.type}).then(res=>{
        	that.setState({
                id:res.data.curr._id,
        		title:res.data.curr.title,
        		tagSelected:res.data.curr.tag._id,
        		categorySelected:res.data.curr.category._id,
        		poster:res.data.curr.poster,
        		previewText:res.data.curr.previewText,
        		highlightHtml:res.data.curr.codeContent
        	}, ()=>{
                that.state.smde.codemirror.setValue(that.state.highlightHtml);
            });

        });
    }
	getTagAndCategoryList(){
		API.getCategoryList().then(res=>{
            this.setState({categoryList:res.data})
        });
        API.getTagList().then(res=>{
            this.setState({tagList:res.data})
        });
	}
	addPoster(e){
        var that = this;
		this.setState({isPosterUploading: true});
        var MB = 1*1024*1024;
        var file = e.target.files[0];
        var size = file.size;
        if(size > 5*MB){
            this.props.setToast('图片不能超过5MB');
            return;
        }
        var formData = new FormData();
        formData.append('poster',file);
        var that = this;
        Axios.post(`${CONFIG.ROOT_API}/article/addPoster`, formData, {
            headers: {
                'withCredentials':true,
                'Content-Type': false,
                'x-access-token':that.props.token
            },
            timeout:100000
        }).then(res=>{
            that.setState({isPosterUploading: false, poster: res.data.data.posterName});
            e.persist();
        }, err=>{
            that.props.setToast('异常');
            e.persist();
            that.setState({isPosterUploading: false});
        }).catch(e=>{
            that.props.setToast('异常');
            e.persist();
            that.setState({isPosterUploading: false})
        });
	}
	postArticle(){
		if(!this.state.title){
            return this.props.setToast('请添加标题');
        }
        if(!this.state.tagSelected){
            return this.props.setToast('请添加标签');
        }
        if(!this.state.categorySelected){
            return this.setToast('请添加分类');
        }
        if(!this.state.previewText){
            return this.props.setToast('请添加导读');
        }
        if(!this.state.highlightHtml.replace(/^\s*|\s*$/,'')){
            return this.props.setToast('请添加内容');
        }
        var that = this;
        var obj = {
            id:that.state.id,
            title:that.state.title,
            tag:that.state.tagSelected,
            category:that.state.categorySelected,
            previewText:that.state.previewText,
            codeContent:that.state.highlightHtml,
            poster:that.state.poster,
            content:that.state.smde.markdown(that.state.highlightHtml)
        }
        API.editArticle(obj).then(res=>{
        	that.setState({
				tagSelected:'',
	            categorySelected:'',
	            title:'',
	            previewText:'',
	            poster:'',
	            highlightHtml:''
        	});
        	that.state.smde.codemirror.setValue('');
            browserHistory.push('/admin/home/article');
        });
	}
	posterChange(e){
		//b为单位，1mb = 1*1024*1024b;
        this.elScrollTop = this.refs.el.scrollTop;
        var MB = 1*1024*1024;
        this.setState({isUploading: true});
        var cm = this.state.smde.codemirror;
        var file = e.target.files[0];
        var size = file.size;
        if(size > 5*MB){
            this.props.setToast('图片不能超过5MB');
            return;
        }
        var formData = new FormData();
        formData.append('poster',file);
        var that = this;
        var tempText = `\n![${file.name}](http://...)`;
        //获取光标位置
        var pos = cm.getCursor();
        cm.setSelection(pos, pos);
        cm.replaceSelection(tempText);
        // return;
        Axios.post(`${CONFIG.ROOT_API}/article/addPoster`, formData, {
            headers: {
                'withCredentials':true,
                'Content-Type': false,
                'x-access-token':that.props.token
            },
            timeout:100000
        }).then(res=>{
            that.setState({isUploading: false});
            var reg = new RegExp('\\!\\['+file.name+'\\]\\(http:\\/\\/\\.\\.\\.\\)','gm');
            cm.setValue(cm.getValue().replace(reg, `![default](${CONFIG.POSTER_URL}/${res.data.data.posterName})`));
            that.refs.el.scrollTop = that.elScrollTop;
            e.persist();
        }, err=>{
            that.props.setToast('异常');
            e.persist();
            that.setState({isUploading: false});
        }).catch(e=>{
            that.props.setToast('异常');
            e.persist();
            that.setState({isUploading:false});
        });
	}
	getParseContent(){
        console.log(this.state.highlightHtml)
        console.log(this.state.smde.codemirror.getValue())
    }
	tagSelectChange(val){
		this.setState({tagSelected:val});
	}
	categorySelectChange(val){
		this.setState({categorySelected:val});
	}
	componentDidMount(){
		this.setState({smde:this.refs.smde.simplemde});
	}
	titleChange(val){
		this.setState({
			title:val
		});
	}
	previewTextChange(val){
		this.setState({
			previewText:val
		});
	}
	onSmdeChange(val){
		this.setState({highlightHtml:val})
	}
	render(){
		return(
			<div className="add-article" ref="el">
				<div className="info">
					<Select value={this.state.tagSelected} placeholder="选择标签" onChange={this.tagSelectChange.bind(this)}>
					{
				        this.state.tagList.map(tag => {
				         	return <Select.Option key={tag._id} label={tag.name} value={tag._id} />
				        })
				    }
				    </Select>
				    <Select value={this.state.categorySelected} placeholder="选择分类" onChange={this.categorySelectChange.bind(this)}>
					{
				        this.state.categoryList.map(cate => {
				         	return <Select.Option key={cate._id} label={cate.name} value={cate._id} />
				        })
				    }
				    </Select>
				</div>
				<div className="margin-top-20">
		            <Input value={this.state.title} onChange={this.titleChange.bind(this)} name="title" placeholder="请输入标题" />
		        </div>
		        <div className="margin-top-20">
		            <Input value={this.state.previewText} onChange={this.previewTextChange.bind(this)} name="previewText" placeholder="请输入导读" />
		        </div>
				<Smde ref="smde" value={this.state.highlightHtml} onInput={this.onSmdeChange.bind(this)} />
				<div className="margin-top-20">
		            <label className="upload-btn">
		                <span className={this.state.isUploading ? 'icon-spinner icon-spin' :''}>{this.state.isUploading ? '' : '上传图片'}</span>
		                <input type="file" style={{display:'none'}} name="poster" onChange={this.posterChange.bind(this)} accept="image/gif, image/jpeg, image/png" />
		            </label>
		            <label className="upload-btn margin-left-5">
		                <span className={this.state.isPosterUploading ? 'icon-spinner icon-spin' :''}>{this.state.isPosterUploading ? '' : '上传封面' }</span>
		                <input type="file" style={{display:'none'}} name="poster" onChange={this.addPoster.bind(this)} accept="image/gif, image/jpeg, image/png" />
		            </label>
		        </div>
		        <div className="btn text-right margin-top-20">
		            <Button type="info" size="large" onClick={this.postArticle.bind(this)}>提交</Button>
		            <Button type="danger" size="large">清空</Button>
		            <Button type="danger" size="large" onClick={this.getParseContent.bind(this)}>查看</Button>
	        	</div>
			</div>
		)
	}
    componentWillMount(){
        this.getTagAndCategoryList();
        setTimeout(this.getArticle.bind(this));
    }
    componentWillReceiveProps(){
        setTimeout(this.getArticle.bind(this))
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.params.id !== this.state.id;
    }
}
const mapStateProps = state=>{
	return{
		token:state.common.token
	}
}
const mapDispatchProps = dispatch=>{
	return {
		setToast:(msg)=>dispatch(setToast(msg))
	}
}
export default connect(mapStateProps, mapDispatchProps)(AdminEditArticle);
