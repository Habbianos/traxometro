import React, { Component } from 'react';
import "./Conectar.css";
import "./../../../../componentes/Box/Box.css";
import "./../../../../componentes/Input/Input.css";

export default class Conectar extends Component {
	submitLogin(e) {
		e.preventDefault();
		this.props.mudarCena("principal", true)
	}

	loginAnonimo = () => {
		this.props.mudarCena("principal", true)
	}

	render() {
		return (
			<div className="Conectar Caixa">
				<header>Conectar</header>
				<main>
					<form onSubmit={ this.submitLogin.bind(this) }>
						<label>
							Nome do seu usuário
							<br/>
							<input type="text" className="grande" autoComplete="nickname" required />
						</label>
						<br/>
						<label>
							Senha
							<br/>
							<input type="password" className="grande" autoComplete="current-password" required />
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