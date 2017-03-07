import React, { Component } from 'react';
import './LinhaDoTempo.css';
import Camada from './Camada';

export default class LinhaDoTempo extends Component {
	render() {
		return (
			<div className="LinhaDoTempo">
				<Camada />
				<Camada />
				<Camada />
				<Camada />
			</div>
		);
	}
}