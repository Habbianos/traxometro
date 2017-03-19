import React, { Component } from 'react';
import './Camada.css';
import './modulos-e-cores.css';

export default class Camada extends Component {
	render() {
		return (
			<div className="Camada">
				{ this.props.children }
			</div>
		);
	}
}