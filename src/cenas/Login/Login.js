import React, { Component } from 'react';
import "./Login.css";
import Televisor from './componentes/Televisor/Televisor';
import Musica from './componentes/Musica/Musica';
import PrimeiraVez from "./componentes/PrimeiraVez/PrimeiraVez";
import Conectar from "./componentes/Conectar/Conectar";
import Cadastro from "./componentes/Cadastro/Cadastro";
import Alertas from "./../../componentes/Alertas/Alertas";

import habbo_theme_song from "./audios/habbo_theme_song.mp3";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: 'entrar', // entrar, cadastro
			adcAlerta: () => {}
		}

	}

	mudarCena = (nova_cena) => {
		this.setState({cena: nova_cena});
	}

	setAdcAlert = (func) => {
		this.setState({
			adcAlerta: func
		});
	}

	render() {
		let televisor;
		switch (this.state.cena) {
			case "cadastro":
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<Cadastro mudarCena={ this.mudarCena } adcAlerta={ this.state.adcAlerta } />
						{ this.state.janelas }
						<Alertas setAdcAlert={ this.setAdcAlert } />
					</Televisor>
				);
				break;

			case "entrar":
			default:
				televisor = (
					<Televisor>
						<Musica src={ habbo_theme_song } />
						<PrimeiraVez mudarCena={ this.mudarCena } />
						<Conectar mudarCena={ this.props.mudarCena } adcAlerta={ this.state.adcAlerta } />
						{ this.state.janelas }
						<Alertas setAdcAlert={ this.setAdcAlert } />
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