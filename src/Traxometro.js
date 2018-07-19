import React, { Component } from "react";
// import * as firebase from "firebase";
// require("firebase/firestore");
import "./Traxometro.css";
import Login from "./widgets/Login/Login";
import Principal from "./widgets/Principal/Principal";
import MudarLista from "./widgets/MudarLista/MudarLista";
import CriadorMusica from "./widgets/CriadorMusica/CriadorMusica";


class Traxometro extends Component {
	constructor(props){
	    super(props);

		this.state = {
			cena: 'login'
		};

		this.cenas = {
			'login': <Login mudarCena={this.mudarCena} />,
			'principal': <Principal mudarCena={this.mudarCena} />,
			'mudarLista': <MudarLista mudarCena={this.mudarCena} />,
			'criadorMusica': <CriadorMusica mudarCena={this.mudarCena} />
		};
	}

	mudarCena = (nova_cena) => {
		this.setState({
			cena: nova_cena
		});
	}

	render() {
		return (
			<div className='Traxometro'>
				{ this.cenas[this.state.cena] }
			</div>
		);
	}
}

export default Traxometro;