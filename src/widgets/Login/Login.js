import React, { Component } from 'react';
import "./Login.css";
import Televisor from './Televisor/Televisor';
import Musica from './../Musica/Musica';
import PrimeiraVez from "./PrimeiraVez/PrimeiraVez";
import Conectar from "./Conectar/Conectar";

export default class Login extends Component {
	render() {
		return (
			<div className="Login">
				<Televisor>
					<Musica src="./audios/habbo_theme_song.mp3" />
					<PrimeiraVez />
					<Conectar />
				</Televisor>
			</div>
		)
	}
}