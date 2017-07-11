import React from 'react';
import PropTypes from 'prop-types';

import '../../assets/css/home/category.css';

const Category = ({children, categoryArticleGroup, onCateClick})=>(
    <div className="moveup home-category">
        { children }
        <div className="cont">
            {
                categoryArticleGroup.map(item=>(
                    <a href="javascript:;" onClick={()=>onCateClick(item._id.name, 'category')} key={item._id._id}>
                        <span className="name">{item._id && item._id.name}</span>
                        <span className="number">({item.total || 0})</span>
                    </a>
                ))
            }
        </div>
    </div>
)
Category.propTypes = {
    children:PropTypes.node,
    categoryArticleGroup:PropTypes.array.isRequired,
    onCateClick:PropTypes.func.isRequired

}

Category.defaultProps = {
    categoryArticleGroup:[]
}

export default Category;
