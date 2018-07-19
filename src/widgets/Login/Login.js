import React, { Component } from 'react';
import "./Login.css";
import Televisor from './Televisor/Televisor';
import PrimeiraVez from "./PrimeiraVez/PrimeiraVez";
import Conectar from "./Conectar/Conectar";

export default class Login extends Component {
	render() {
		return (
			<div className="Login">
				<Televisor>
					<PrimeiraVez />
					<Conectar />
				</Televisor>
			</div>
		)
	}
}