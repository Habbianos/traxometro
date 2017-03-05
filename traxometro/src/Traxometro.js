import React, { Component } from 'react';
import './Traxometro.css';
import ListaSons from './ListaSons';
import ListaSonsLinha from './ListaSonsLinha';

class Traxometro extends Component {
	render() {
		const ListaCartuchos = [];
		let DbCartuchos = require('./db/cartuchos.json').cartuchos;
		DbCartuchos.sort((a, b) => {
			return a.id > b.id;
		});
		DbCartuchos.forEach(cartucho => {
			ListaCartuchos.push(
				<ListaSonsLinha key={cartucho.id}>{cartucho}</ListaSonsLinha>
			);
		});


		return (
			<div className="Traxometro">
				<ListaSons>
					{ListaCartuchos}
				</ListaSons>
				<div className="linha-tempo">
					<h1>Linha do Tempo</h1>
				</div>
				<div className="reprodutor">
					<h1>Reprodutor</h1>
					<input type="range" />
					<div className="controles">
						<h2>Controles</h2>
						<input type="button" value="Reproduzir" />
						<input type="button" value="Pausar" />
						<input type="button" value="Parar" />
					</div>
				</div>
			</div>
		);
	}
}

export default Traxometro;