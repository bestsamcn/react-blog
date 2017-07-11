import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import '../../assets/css/common/footer.css';

class Footer extends React.Component{
    render(){
        return (
            <div className="footer margin-top-20">
                <div className="webmap">
                    <Link to="/">首页</Link>
                    <Link to="">搜索</Link>
                    <Link to="">关于</Link>
                    <Link to="">留言</Link>
                </div>
                <div className="copyright">
                    copyright@2017 bestsamcn
                </div>
            </div>
        )
    }
}
export default Footer;
