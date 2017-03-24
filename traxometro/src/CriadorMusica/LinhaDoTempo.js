import React, { Component } from 'react';
import './LinhaDoTempo.css';
import Camada from './Camada';
import Modulo from './Modulo'
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

	pegarCodigoMusica = () => {
		let codigo = '',
			camadas = document.querySelectorAll('.Camada')

		for (let i = 0; i < camadas.length; i++) {
			codigo += (i + 1)+':'
			let codTemp = [],
				modulos = camadas[i].getElementsByClassName('modulo'),
				ultimo = 0,
				cont = 0

			for (let j = 0; j < modulos.length; j++) {
				if (Number(modulos[j].getAttribute('data-somId')) === ultimo) {
					cont++
					continue
				}

				if (j) codTemp.push(ultimo+','+cont)
				
				ultimo = Number(modulos[j].getAttribute('data-somId'))
				cont = 1
			}
			if (ultimo)
				codTemp.push(ultimo+','+cont)

			codigo += codTemp.join(';')

			codigo += ':'
		}
		console.log(codigo)
	}

	render() {
		return (
			<div className="LinhaDoTempo" onClick={this.pegarCodigoMusica}>
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