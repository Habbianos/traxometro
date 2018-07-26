import React, { Component } from 'react'
import "./Principal.css";

export default class Principal extends Component {

	render() {
		return (
			<div className="Principal">
				<div>
					<div className="cabecalho">
						<input type="button" className="fechar" value="" onClick={ () => this.props.mudarCena("login", false) } />
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