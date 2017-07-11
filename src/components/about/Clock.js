import React from 'react';
import $$ from '../../utils';


class Clock extends React.Component{
    componentDidMount() {
        let el = this.refs.canvas;
        $$.Clock.init(el);
    }
    render(){
        return(
            <div className="">
                <canvas width="300" height="180" ref='canvas' id="canvas"><p className="nope">No canvas, no particles</p></canvas>
                <div id="about">
                    <a href="#" style={{visibility:"hidden",opacity:"0"}} id="toggle-options"></a>
                    <ul id="options" style={{visibility:"hidden", opacity:"0"}}>
                        <li><a href="#" id="quivers" className="">Quiver</a></li>
                        <li><a href="#" id="gradient" className="on">Gradient</a></li>
                        <li><a href="#" id="color" className="on">Colorize</a></li>
                        <li><a href="#" id="valentineify" className="">Valentine-ify</a></li>
                        <li className="group"><span>Mouse down: explode and repel</span></li>
                        <li><span>Mouse down + shift: explode and attract</span></li>
                        <li><span>Arrow Up: increase particle size</span></li>
                        <li className="group"><span>Sorry about your CPU</span></li>
                        <li><span id="fps"></span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Clock;
