import React, { Component } from 'react';
import './Camada.css';
import './modulos-e-cores.css';

export default class Camada extends Component {
	render() {
		return (
			<div className="Camada">
				<i className="modulo" data-moduloClasse="1" data-moduloCor="1"/>
				<i className="modulo" data-moduloClasse="1" data-moduloCor="1"/>
				<i className="modulo" data-moduloClasse="2" data-moduloCor="1"/>
				<i className="modulo" data-moduloClasse="2" data-moduloCor="2"/>
				<i className="modulo" data-moduloClasse="3" data-moduloCor="2"/>
			</div>
		);
	}
}