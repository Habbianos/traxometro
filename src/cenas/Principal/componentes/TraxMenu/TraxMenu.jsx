import React, { Component } from 'react';
import * as firebase from "firebase";
import "./TraxMenu.css";

export default class TraxMenu extends Component {

	handleQuitButton = () => {
		firebase.auth().signOut();
		// this.props.mudarCena("login", true)
	}

	render() {
		return (
			<div className="TraxMenu">
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