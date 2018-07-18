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
			pagina: 'login'
		};

		this.paginas = {
			'login': <Login mudarPagina={this.mudarPagina} />,
			'principal': <Principal mudarPagina={this.mudarPagina} />,
			'mudarLista': <MudarLista mudarPagina={this.mudarPagina} />,
			'criadorMusica': <CriadorMusica mudarPagina={this.mudarPagina} />
		};
	}

	mudarPagina = (nova_pagina) => {
		this.setState({
			pagina: nova_pagina
		});
	}

	render() {
		return (
			<div className='Traxometro'>
				{ this.paginas[this.state.pagina] }
			</div>
		);
	}
}

export default Traxometro;