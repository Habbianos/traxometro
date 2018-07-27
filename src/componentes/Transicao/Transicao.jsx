import React, { Component, Fragment } from 'react'
// import "./Transicao.css";
import P5Wrapper from 'react-p5-wrapper';
import sketch from "./sketch";

export default class Transicao extends Component {
    
	render() {
		return (
			<Fragment>
                <canvas id="transicao" />
                <P5Wrapper sketch={sketch} mude={ this.props.mude } fim={ this.props.fim } pointIn={ this.props.pointIn} pointOut={ this.props.pointOut } />
            </Fragment>
		)
	}
}