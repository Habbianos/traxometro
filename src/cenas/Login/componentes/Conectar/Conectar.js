import React, { Component } from 'react';
import "./Conectar.css";
import "./../../../../componentes/Box/Box.css";
import "./../../../../componentes/Input/Input.css";

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
						<button type="button">Esqueceu sua senha?</button>
						<input type="submit" value="ENTRAR"/>
					</form>
				</main>
				<footer><button type="button">Entrar anônimo</button></footer>
			</div>
		)
	}
}