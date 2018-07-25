import React, { Component } from 'react';
import "./PrimeiraVez.css";
import "./../../../../componentes/Box/Box.css";

export default class PrimeiraVez extends Component {
	render() {
		return (
			<div className="PrimeiraVez Caixa">
				<header>Primeira vez aqui?</header>
				<main>
					<span>Ainda não tem conta?</span><br/><button type="button" onClick={ () => this.props.mudarCena("cadastro") }>Você pode criar uma aqui</button>
				</main>
			</div>
		)
	}
}