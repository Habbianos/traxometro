import React, { Component } from 'react'
import './ListaDeReproducao.css'

export default class ListaDeReproducao extends Component {
	render() {
		return (
			<div className="ListaDeReproducao">
				<h2>Lista de Reprodução</h2>
				<div className="lista">
				</div>
				<button className="salvar">Salvar Lista</button>
			</div>
		)
	}
}