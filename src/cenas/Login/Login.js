import React, { Component, Fragment } from 'react';
import * as firebase from "firebase";
import "./Login.css";
import Televisor from './componentes/Televisor/Televisor';
import Musica from './componentes/Musica/Musica';
import PrimeiraVez from "./componentes/PrimeiraVez/PrimeiraVez";
import Conectar from "./componentes/Conectar/Conectar";
import Cadastro from "./componentes/Cadastro/Cadastro";
import Alertas from "./../../componentes/Alertas/Alertas";
import BemVindo from "./componentes/BemVindo/BemVindo";

import habbo_theme_song from "./audios/habbo_theme_song.mp3";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: 'entrar', // entrar, cadastro
			adcAlerta: () => {}
		}

		firebase.auth().onAuthStateChanged((user) => {
			this.setState({
				user: user
			});
		});
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
		let televisor,
			welcome,
			temp;

		if (this.state.user) {
			welcome = <BemVindo user={ this.state.user } />
		}

		switch (this.state.cena) {
			case "cadastro":
				temp = welcome || (
					<Fragment>
						<Musica src={ habbo_theme_song } />
						<Cadastro mudarCena={ this.mudarCena } adcAlerta={ this.state.adcAlerta } />
						<Alertas setAdcAlert={ this.setAdcAlert } />
					</Fragment>
				)
				televisor = (
					<Televisor>
						{ temp }
					</Televisor>
				);
				break;

			case "entrar":
			default:
				temp = welcome || (
					<Fragment>
						<Musica src={ habbo_theme_song } />
						<PrimeiraVez mudarCena={ this.mudarCena } />
						<Conectar mudarCena={ this.props.mudarCena } adcAlerta={ this.state.adcAlerta } />
						<Alertas setAdcAlert={ this.setAdcAlert } />
					</Fragment>
				)
				televisor = (
					<Televisor>
						{ temp }
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