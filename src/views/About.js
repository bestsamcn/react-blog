import React from 'react';
import Clock from '../components/about/Clock';
import '../assets/css/about/index.css';
class About extends React.Component{
    render(){
        return(
            <div className="about">
                <div className="main">
                    <div className="info-box">
                        <div className="bg">
                            <Clock />
                        </div>
                        <div className="avatar">
                            <img src={require('../assets/img/avatar.png')} />
                        </div>
                        <div className="describe">
                            <div className="name color-black font-20">
                                BestSamCN
                            </div>
                            <div className="intr color-gray font-14 margin-top-5">
                                一条有梦想的咸鱼
                            </div>
                        </div>
                        <div className="footer">
                            <a href="https://github.com/bestsamcn" className="icon-github"></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;
