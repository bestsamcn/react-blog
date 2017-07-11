import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/home/tag.css';

const Tag = ({children, tagArticleGroup, onTagClick})=>(
    <div className="moveup tags margin-top-30">
        {children}
        <div className="cont">
            <div className="wrapper padding-0">
            	{
            		tagArticleGroup.map(item=>(
            			<a href="javascript:;" onClick={()=>onTagClick(item._id && item._id.name, 'tag')} className="tag-item"  key={item._id._id}>
		                    <span>{item._id && item._id.name}</span>
		                </a>
            		))
            	}
            </div>
        </div>
    </div>
)
Tag.propTypes = {
    children:PropTypes.node,
    tagArticleGroup:PropTypes.array.isRequired,
    onTagClick:PropTypes.func.isRequired

}

Tag.defaultProps = {
    tagArticleGroup:[]
}

export default Tag;
