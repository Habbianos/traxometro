import React, { Component } from 'react';
import "./Login.css";
import Televisor from './Televisor/Televisor';
import Musica from './../Musica/Musica';
import PrimeiraVez from "./PrimeiraVez/PrimeiraVez";
import Conectar from "./Conectar/Conectar";
import Cadastro from "./Cadastro/Cadastro";

import habbo_theme_song from "./../../audios/habbo_theme_song.mp3";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: 'entrar' // cadastro
		}
	}

	mudarCena(nova_cena) {
		this.setState({cena: nova_cena});
	}

	render() {
		let televisor;
		switch (this.state.cena) {
			case "cadastro":
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<Cadastro mudarCena={ this.mudarCena.bind(this) } />
					</Televisor>
				);
				break;

			case "entrar":
			default:
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<PrimeiraVez mudarCena={ this.mudarCena.bind(this) } />
						<Conectar />
					</Televisor>
				);
		}

		return (
			<div className="Login">
				{ televisor }
			</div>
		);
	}
}