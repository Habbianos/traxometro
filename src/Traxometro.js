import React, { Component, Fragment } from "react";
import * as firebase from "firebase";
// require("firebase/firestore");
// import "firebase/auth";
import "./Traxometro.css";
import Login from "./cenas/Login/Login";
import Principal from "./cenas/Principal/Principal";
import MudarLista from "./cenas/MudarLista/MudarLista";
import CriadorMusica from "./cenas/CriadorMusica/CriadorMusica";
import Transicao from "./componentes/Transicao/Transicao";

class Traxometro extends Component {
	constructor(props){
	    super(props);

		this.state = {
			cena: <Fragment />,
			transicao: <Fragment />
		};
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				user: user
			});
			if (user) {
				this.mudarCena("principal", true);
			} else {
				this.mudarCena("login", true);
			}
		});
	}

	mudarCena = (nova_cena, transicao = false) => {
		if (transicao) {
			this.transicaoCena(nova_cena);
		} else {

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
			} } />
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