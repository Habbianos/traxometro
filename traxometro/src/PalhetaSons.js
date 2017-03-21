import React, { Component } from 'react';
import './PalhetaSons.css';
import './modulos-e-cores.css';

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
		if (this.state.cartucho.id && this.state.cartucho.sons[i].arquivo !== "") {
			if (i !== null) {
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
					<li onMouseEnter={()=>this.previaSom(0)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="1" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(1)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="2" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(2)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="3" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(3)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="4" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(4)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="5" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(5)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="6" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(6)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="7" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(7)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="8" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li onMouseEnter={()=>this.previaSom(8)} onMouseLeave={() => this.previaSom()}>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="9" data-moduloCor={this.state.cor}></i>) : null}
					</li>
				</ul>
			</div>
		)
	}
}

export default PalhetaSons;