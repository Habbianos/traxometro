import React, { Component } from 'react';
import "./Cadastro.css";
import "./../../../../componentes/Box/Box.css";
import "./../../../../componentes/Input/Input.css";

export default class Cadastro extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: "detalhes" // vincular
		};
	}

	mudarCena(cena) {
		this.setState({
			cena: cena
		});
	}

	voltar() {
		if (this.state.cena === "detalhes") {
			this.props.mudarCena("entrar");
		} else if (this.state.cena === "vincular") {
			this.mudarCena("detalhes");
		}
	}

	proximo() {
		if (this.state.cena === "detalhes") {
			this.mudarCena("vincular")
		} else if (this.state.cena === "vincular") {
			// Login
		}
	}

	render() {
		return (
			<div className="Cadastro Caixa">
				<header>
					<buttom onClick={ () => this.props.mudarCena("entrar") }>close</buttom>
					<h1>Detalhes da conta</h1>
				</header>
				<main>
					<form>
						<label>
							<span>Nome do usuário:</span>
							<br />
							<input type="text" autoComplete="name" />
						</label>
						<br />
						<label>
							<span>Email:</span>
							<br />
							<input type="e-mail" autoComplete="email" />
						</label>
						<div id="passwords">
							<div>
								<label>
									<span>Senha:</span>
									<br />
									<input type="password" autoComplete="new_password" />
								</label>
							</div>
							<div>
								<label>
									<span>Repita a senha:</span>
									<br />
									<input type="password" autoComplete="new_password" />
								</label>
							</div>
						</div>
						<label>
							<input type="checkbox" />
							Eu sei, o Traxômetro não é da Sulake
						</label>
					</form>
					<button type="button">Regras do Traxômetro - leia-as agora!</button>
				</main>
				<footer>
					<input type="button" value="Voltar" onClick={ this.voltar.bind(this) } />
					<span>{ this.state.cena === "detalhes" ? "1" : "2" }/2</span>
					<input type="button" value={ this.state.cena === "detalhes" ? "Próximo" : this.state.cena === "vincular" ? "Feito" : "" } onClick={ this.proximo.bind(this) } />
				</footer>
			</div>
		)
	}
}