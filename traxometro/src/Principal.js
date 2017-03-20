import React, { Component } from 'react'
import "./Principal.css";

export default class Principal extends Component {
	constructor(props){
	    super(props);
		this.state = {
			tocando: true
		}
	}
	render() {
		return (
			<div className="Principal">
				<div className="cabecalho">
					<input type="button" className="fechar" value="" />
					<h1>Menu Trax</h1>
				</div>
				<div className="corpo">
					<button onClick={() => this.setState({tocando: this.props.tocarPausarLista()})}>{this.state.tocando ? "Ligar" : "Desligar"}</button>
					<button onClick={() => this.props.mudarPagina("mudarLista")}>Editar Lista</button>
				</div>
			</div>
		)
	}
}