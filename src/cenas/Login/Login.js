import React, { Component } from 'react';
import "./Login.css";
import Televisor from './componentes/Televisor/Televisor';
import Musica from './componentes/Musica/Musica';
import PrimeiraVez from "./componentes/PrimeiraVez/PrimeiraVez";
import Conectar from "./componentes/Conectar/Conectar";
import Cadastro from "./componentes/Cadastro/Cadastro";

import habbo_theme_song from "./audios/habbo_theme_song.mp3";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: 'entrar', // entrar, cadastro
			janelas: []
		}
	}

	mudarCena(nova_cena) {
		this.setState({cena: nova_cena});
	}

	adicionarJanela(componente) {
		this.setState({
			janelas: [...this.state.janelas, componente]
		});
	}
	removerJanela(componente) {
		this.setState({
			janelas: this.state.janelas.filter(item => item !== componente)
		});
	}

	render() {
		let televisor;
		switch (this.state.cena) {
			case "cadastro":
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<Cadastro mudarCena={ this.mudarCena.bind(this) } />
						{ this.state.janelas }
					</Televisor>
				);
				break;

			case "entrar":
			default:
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<PrimeiraVez mudarCena={ this.mudarCena.bind(this) } />
						<Conectar mudarCena={ this.props.mudarCena.bind(this) } />
						{ this.state.janelas }
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