import React, { Component } from 'react'
import * as firebase from "firebase";
import "./Principal.css";

export default class Principal extends Component {

	handleQuitButton = () => {
		firebase.auth().signOut();
		// this.props.mudarCena("login", true)
	}

	render() {
		return (
			<div className="Principal">
				<div>
					<div className="cabecalho">
						<input type="button" className="fechar" value="" onClick={ this.handleQuitButton } />
						<h1>Menu Trax</h1>
					</div>
					<div className="corpo">
						<button>Ligar</button>
						<button onClick={() => this.props.mudarCena("mudarLista")}>Editar Lista</button>
					</div>
				</div>
			</div>
		)
	}
}