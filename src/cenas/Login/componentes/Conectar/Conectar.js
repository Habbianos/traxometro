import React, { Component, Fragment } from 'react';
import ReactDOM from "react-dom";
import * as firebase from "firebase";
import "firebase/firestore";
import "./Conectar.css";
import "./../../../../componentes/Box/Box.css";
import "./../../../../componentes/Input/Input.css";

export default class Conectar extends Component {
	submitLogin = (e) => {
		e.preventDefault();
		let formData = new FormData(ReactDOM.findDOMNode(this).querySelector("form")),
			email = formData.get('email'),
			pass = formData.get('pass');
			
		firebase.auth().signInWithEmailAndPassword(email, pass)
			.catch(err => {
				if (err.code === 'auth/wrong-password') {
					this.props.adcAlerta("Atenção", "Senha incorreta.");
				} else {
					this.props.adcAlerta("Atenção", err.message);
				}
			})
	}

	loginAnonimo = () => {
		firebase.auth().signInAnonymously().catch(function(err) {
			this.props.adcAlerta("Atenção", err.message);
		});
		this.props.adcAlerta("Cuidado", (
			<Fragment>
				Você está entrando em modo anônimo.
				<br />
				Tudo que fizer será armazenado apenas na sessão do seu navegador.
			</Fragment>
		));
	}

	render() {
		return (
			<div className="Conectar Caixa">
				<header>Conectar</header>
				<main>
					<form onSubmit={ this.submitLogin }>
						<label>
							E-mail do seu usuário
							<br/>
							<input type="text" name="email" className="grande" autoComplete="username email" required />
						</label>
						<br/>
						<label>
							Senha
							<br/>
							<input type="password" name="pass" className="grande" autoComplete="current-password" required />
						</label>
						<br/>
						<button type="button">Esqueceu sua senha?</button>
						<input type="submit" value="ENTRAR"/>
					</form>
				</main>
				<footer><button type="button" onClick={ this.loginAnonimo }>Entrar anônimo</button></footer>
			</div>
		)
	}
}