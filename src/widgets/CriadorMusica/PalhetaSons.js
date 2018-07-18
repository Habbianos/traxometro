import React, { Component } from 'react';
import './PalhetaSons.css';
import './../../modulos-e-cores.css';

class PalhetaSons extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cor: this.props.cor || 1
		}

		this.previa = new Audio()
		this.previa.loop = true
	}

	previaSom(i = null) {
		if (this.state.cartucho.id) {
			if (i !== null && this.state.cartucho.sons[i].arquivo !== "") {
				if (this.props.tocarPausarLista(true)) {
					this.props.tocarPausarLista()
					this.previa.pausouPrincipal = true
				}
				this.previa.src = process.env.PUBLIC_URL+"/audios/"+this.state.cartucho.sons[i].arquivo
				this.previa.load()
				this.previa.play()
			} else {
				if (!this.props.tocarPausarLista(true) && this.previa.pausouPrincipal) {
					this.props.tocarPausarLista()
					this.previa.pausouPrincipal = false
				}
				this.previa.pause()
				this.previa.src = ""
			}
		}
	}

	pegarModulo = (classe = 1, cor = 1, somId = 0) => {
		return (
			<i
				className="modulo"
				data-moduloClasse={classe}
				data-moduloCor={cor}
				onMouseEnter={() => this.previaSom(somId)}
				onMouseLeave={() => this.previaSom()}
				onClick={() => this.props.ativarDesativarModulo(this.state.cartucho.sons[classe-1], classe, cor)}
				data-ativado={this.props.moduloAtivo && this.props.moduloAtivo.mCor === cor && this.props.moduloAtivo.mClasse === classe ? true : false}
			></i>
		)
	}

	render() {
		this.state = {
			cor: this.state.cor,
			cartucho: this.props.children || {}
		};

		return (
			<div className="PalhetaSons">
				<h1
					data-moduloCor={this.state.cor}
					onClick={()=>this.props.removerCartucho(this.props.idPalheta)}
				>
					{this.state.cartucho.id ? (<span>{this.state.cartucho.nome}</span>) : null}
				</h1>
				<ul>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(1, this.state.cor, 0) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(2, this.state.cor, 1) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(3, this.state.cor, 2) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(4, this.state.cor, 3) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(5, this.state.cor, 4) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(6, this.state.cor, 5) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(7, this.state.cor, 6) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(8, this.state.cor, 7) : null}
					</li>
					<li>
						{this.state.cartucho.id ? this.pegarModulo(9, this.state.cor, 8) : null}
					</li>
				</ul>
			</div>
		)
	}
}

export default PalhetaSons;