import React, { Component } from 'react'
import "./Principal.css";

export default class Principal extends Component {
	render() {
		return (
			<div className="Principal">
				<div className="cabecalho">
					<input type="button" className="fechar" value="" />
					<h1>Menu Trax</h1>
				</div>
				<div className="corpo">
					<button>Ligar</button>
					<button onClick={() => this.props.mudarPagina("mudarLista")}>Editar Lista</button>
				</div>
			</div>
		)
	}
}