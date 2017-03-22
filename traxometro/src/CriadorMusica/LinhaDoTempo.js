import React, { Component } from 'react';
import './LinhaDoTempo.css';
import Camada from './Camada';
import Modulo from './modulo'
import Agulha from './Agulha';

export default class LinhaDoTempo extends Component {

	pegarRecipienteModulo = (qtd = 1) => {
		let saida = [];
		for (let i = 0; i < qtd; i++) {
			let elemento = (
				<Modulo
					key={i}
					moduloAtivo={this.props.moduloAtivo}
				/>
			)
			saida.push(elemento)
		}
		return saida
	}

	render() {
		return (
			<div className="LinhaDoTempo">
				<Camada>
					{ this.pegarRecipienteModulo(24) }
				</Camada>
				<Camada>
					{ this.pegarRecipienteModulo(24) }
				</Camada>
				<Camada>
					{ this.pegarRecipienteModulo(24) }
				</Camada>
				<Camada>
					{ this.pegarRecipienteModulo(24) }
				</Camada>
				<Agulha />
			</div>
		);
	}
}