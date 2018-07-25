import React, { Component } from 'react';
import './Reprodutor.css';
import Controles from './Controles';
import LinhaDoTempo from './LinhaDoTempo';

export default class Reprodutor extends Component {
	render() {
		return (
			<div className="Reprodutor">
				<Controles />
				<LinhaDoTempo moduloAtivo={this.props.moduloAtivo} />
			</div>
		)
	}
}