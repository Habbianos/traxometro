import React, { Component } from 'react';
import './LinhaDoTempo.css';
import Camada from './Camada';
import Agulha from './Agulha';

export default class LinhaDoTempo extends Component {
	render() {
		return (
			<div className="LinhaDoTempo">
				<Camada>
					<i className="modulo" data-moduloClasse="1" data-moduloCor="1"/>
					<i className="modulo" />
					<i className="modulo" data-moduloClasse="1" data-moduloCor="1"/>
					<i className="modulo" data-moduloClasse="2" data-moduloCor="1"/>
					<i className="modulo" data-moduloClasse="2" data-moduloCor="2"/>
					<i className="modulo" data-moduloClasse="3" data-moduloCor="2"/>
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
					<i className="modulo" />
				</Camada>
				<Camada />
				<Camada />
				<Camada />
				<Agulha />
			</div>
		);
	}
}