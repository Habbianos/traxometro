import React, { Component } from 'react';
import "./PrimeiraVez.css";
import "./../../Box/Box.css";

export default class PrimeiraVez extends Component {
	render() {
		return (
			<div className="PrimeiraVez Caixa">
				<header>Primeira vez aqui?</header>
				<main>
					<span>Ainda não tem conta?<br/><a href="#">Você pode criar uma aqui</a></span>
				</main>
			</div>
		)
	}
}