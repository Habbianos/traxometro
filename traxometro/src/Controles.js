import React, { Component } from 'react';
import './Controles.css';

export default class Controles extends Component {
	render() {
		return (
			<div className="Controles">
				<input type="button" className="reproduzirPausar" disabled />
				<input type="button" className="parar" disabled />
				<input type="button" className="salvar" disabled />
				<input type="button" className="abrir" />
				<input type="button" className="limpar" disabled />
				<input type="button" className="moveEsquerda" disabled />
				<input type="button" className="moveDireita" disabled />
			</div>
		)
	}
}