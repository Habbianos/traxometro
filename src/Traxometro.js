import React, { Component, Fragment } from "react";
// import * as firebase from "firebase";
// require("firebase/firestore");
import "./Traxometro.css";
import Login from "./cenas/Login/Login";
import Principal from "./cenas/Principal/Principal";
import MudarLista from "./cenas/MudarLista/MudarLista";
import CriadorMusica from "./cenas/CriadorMusica/CriadorMusica";
import Transicao from "./componentes/Transicao/Transicao";

const center = {x: (window.innerWidth / 2), y: (window.innerHeight / 2)};

class Traxometro extends Component {
	constructor(props){
	    super(props);

		this.state = {
			cena: <Login mudarCena={this.mudarCena} />,
			transicao: <Fragment />
		};

		this.destaqueCena = {
			'login': {x: (center.x - 264), y: (center.y + 122)},
			'principal': center // TODO: Calcular onde será, quando o avatar estiver posicionado
		}
		this.pontoTransicao = {
			'out': this.destaqueCena['login'],
			'in': center
		}
	}

	mudarCena = (nova_cena, transicao = false) => {
		if (transicao) {
			this.pontoTransicao.in = this.destaqueCena[nova_cena] || center;
			this.transicaoCena(nova_cena);
		} else {
			this.pontoTransicao.out = this.destaqueCena[nova_cena] || center;

			let comp;
			switch (nova_cena) {
				case 'principal':
					comp = <Principal mudarCena={this.mudarCena} />
					break;
				case 'mudarLista':
					comp = <MudarLista mudarCena={this.mudarCena} />
					break;
				case 'criadorMusica':
					comp = <CriadorMusica mudarCena={this.mudarCena} />
					break;
				case 'login':
				default:
					comp = <Login mudarCena={this.mudarCena} />
			}
			this.setState({
				cena: comp
			});
		}
	}

	transicaoCena = (nova_cena) => {
		this.setState({
			transicao: <Transicao mude={ () => {
				this.mudarCena(nova_cena)
			} } fim={ () => {
				this.setState({
					transicao: <Fragment />
				})
			} } pointOut={ this.pontoTransicao.out } pointIn={ this.pontoTransicao.in } />
		})
	}

	render() {
		return (
			<div className='Traxometro'>
				{ this.state.transicao }
				{ this.state.cena }
			</div>
		);
	}
}

export default Traxometro;