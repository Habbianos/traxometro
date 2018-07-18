import React, { Component } from 'react'
import "./Televisor.css";

export default class Televisor extends Component {
	render() {
		return (
			<div className="Televisor">
				{ this.props.children }
			</div>
		)
	}
}