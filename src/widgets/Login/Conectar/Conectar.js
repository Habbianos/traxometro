import React, { Component } from 'react';
import "./Conectar.css";
import "./../../Box/Box.css";
import "./../../Input/Input.css";

export default class Conectar extends Component {
	render() {
		return (
			<div className="Conectar Caixa">
				<header>Conectar</header>
				<main>
					<form action="" method="POST">
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
						<span><a href="#">Esqueceu sua senha?</a></span>
						<input type="submit" value="ENTRAR"/>
					</form>
				</main>
				<footer><a href="#">Entrar anônimo</a></footer>
			</div>
		)
	}
}