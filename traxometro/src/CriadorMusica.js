import React, { Component } from 'react'
import './CriadorMusica.css'
import ListaSons from './ListaSons'
import ListaSonsLinha from './ListaSonsLinha'
import PalhetaSons from './PalhetaSons'
import Reprodutor from './Reprodutor'

export default class CriadorMusica extends Component {
	constructor(props){
	    super(props);

		const DbCartuchos = require('./db/cartuchos.json').cartuchos;
		DbCartuchos.sort((a, b) => {
			a.usado = false;
			return a.id > b.id;
		});

		this.state = {
			dbCartuchos: DbCartuchos,
			cartuInseridos: [],
			qtdPalhetas: 4
		};
	}

	InserirCartucho = (id) => {
		this.state.dbCartuchos.forEach(cartucho => {
			if (cartucho.id === id) {
				for (let i = 0; i < this.state.qtdPalhetas; i++)
					if (this.state.cartuInseridos[i] === undefined || this.state.cartuInseridos[i] === null) {
						let array = this.state.cartuInseridos.slice();
						cartucho.usado = true;
						array[i] = cartucho;
						this.setState({
							cartuInseridos: array
						});
						return;
					}
			}
		})
	}
	RemoverCartucho = (id) => {
		let array = this.state.cartuInseridos.slice();
		this.state.dbCartuchos.forEach(cartucho => {
			if (cartucho === array[id])
				cartucho.usado = false;
		});
		array[id] = null;
		this.setState({
			cartuInseridos: array
		});
	}
	
	render() {


		// let CartuchosInseridos = [];
		// CartuchosInseridos[0] = DbCartuchos[0];
		let Palhetas = [];
		for (let i = 0; i < this.state.qtdPalhetas; i++)
			Palhetas.push((<PalhetaSons key={i} cor={i+1} removerCartucho={this.RemoverCartucho} idPalheta={i}>{this.state.cartuInseridos[i]}</PalhetaSons>));

		let ListaCartuchos = [];
		this.state.dbCartuchos.forEach(cartucho => {
			if (!cartucho.usado)
				ListaCartuchos.push(
					<ListaSonsLinha key={cartucho.id} inserirCartucho={this.InserirCartucho} idCartucho={cartucho.id}>{cartucho}</ListaSonsLinha>
				);
		});

		return (
			<div className="CriadorMusica">
				<div className="cabecalho escuro">
					<input type="button" className="fechar" value="" onClick={() => this.props.mudarPagina("mudarLista")} />
					<h1>Criador de Música</h1>
				</div>
				<div className="corpo">
					<ListaSons>
						{ ListaCartuchos }
					</ListaSons>
					<div className="palhetas-de-sons">
						{ Palhetas }
					</div>
					<Reprodutor />
				</div>
			</div>
		)
	}
}