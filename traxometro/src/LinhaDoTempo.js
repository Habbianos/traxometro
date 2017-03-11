import React, { Component } from 'react';
import './LinhaDoTempo.css';
import Camada from './Camada';
import Agulha from './Agulha';

export default class LinhaDoTempo extends Component {
	render() {
		return (
			<div className="LinhaDoTempo">
				<Camada />
				<Camada />
				<Camada />
				<Camada />
				<Agulha />
			</div>
		);
	}
}