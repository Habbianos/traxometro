import React, { Component } from 'react'
import './../modulos-e-cores.css'

export default class Modulo extends Component {

	constructor(props) {
		super(props)
		this.state = {
			// usado: false,
			// mClasse: null,
			// mCor: null,
			// mOpacity: 1,
		}
	}

	moduloFantasma = (dir = 1, usado = false) => {
		if (!this.isso.hasAttribute('data-moduloClasse') && !this.isso.hasAttribute('data-moduloCor') && this.isso.style.opacity !== 1) {
			let mClasse, mCor, mOpacity

			if (this.props.moduloAtivo && dir) {
				mClasse = this.props.moduloAtivo.mClasse
				mCor = this.props.moduloAtivo.mCor
				mOpacity = usado ? 1 : 0.5
			} else {
				mClasse = null
				mCor = null
				mOpacity = 1
			}

			if (this.props.moduloAtivo) {
				let prox = this.isso.nextSibling;

				// Verificação para saber se cabe
				let vazio = true
				for (let i = 1; i < this.props.moduloAtivo.somObj.comprimento; i++) {
					if (prox.hasAttribute('data-moduloClasse') && prox.hasAttribute('data-moduloCor') && prox.style.opacity === 1)
						vazio = false
					prox = prox.nextSibling
				}
				
				// Insere ou remove
				if (vazio) {
					this.setState({
						mClasse: mClasse,
						mCor: mCor,
						mOpacity: mOpacity
					})
					prox = this.isso.nextSibling;
					for (let i = 1; i < this.props.moduloAtivo.somObj.comprimento; i++) {
						mClasse ? prox.setAttribute('data-moduloClasse', mClasse) : prox.removeAttribute('data-moduloClasse')
						mCor ? prox.setAttribute('data-moduloCor', mCor) : prox.removeAttribute('data-moduloCor')
						prox.style.opacity = mOpacity
						prox = prox.nextSibling
					}
				}
			}
		}
	}

	aoColocarMouse = (e) => {
		if (this.props.moduloAtivo) {
			// Verificando se há espaço
			let prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				if (prox.hasAttribute('data-moduloClasse') && prox.hasAttribute('data-moduloCor') && prox.style.opacity === '1')
					return false
				prox = prox.nextSibling
			}

			// Recebendo os dados
			let mClasse = this.props.moduloAtivo.mClasse,
			mCor = this.props.moduloAtivo.mCor,
			mOpacity = 0.5

			// Colocando os atributos
			prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				prox.setAttribute('data-moduloClasse', mClasse)
				prox.setAttribute('data-moduloCor', mCor)
				prox.style.opacity = mOpacity
				prox = prox.nextSibling
			}

			return true
		}
	}

	aoTirarMouse = (e) => {
		if (this.props.moduloAtivo) {
			// Verificando se há algo
			let prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				if (!prox.hasAttribute('data-moduloClasse') || !prox.hasAttribute('data-moduloCor') || prox.style.opacity === '1')
					return false
				prox = prox.nextSibling
			}

			prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				prox.removeAttribute('data-moduloClasse')
				prox.removeAttribute('data-moduloCor')
				prox.removeAttribute('style')
				prox = prox.nextSibling
			}

			return true
		}
	}

	aoClicarEsq = (e) => {
		if (this.props.moduloAtivo) {
			// Verificando se há espaço
			let prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				if (prox.hasAttribute('data-moduloClasse') && prox.hasAttribute('data-moduloCor') && prox.style.opacity === '1')
					return false
				prox = prox.nextSibling
			}

			// Recebendo os dados
			let mClasse = this.props.moduloAtivo.mClasse,
			mCor = this.props.moduloAtivo.mCor,
			mOpacity = 1

			// Colocando os atributos
			prox = e.target
			for (let i = 0; i < this.props.moduloAtivo.somObj.comprimento; i++) {
				prox.setAttribute('data-moduloClasse', mClasse)
				prox.setAttribute('data-moduloCor', mCor)
				prox.setAttribute('data-parte', i)
				prox.style.opacity = mOpacity
				prox = prox.nextSibling
			}

			return true
		}
	}

	aoClicarDir = (e) => {
		e.preventDefault()

		let prox = e.target, i

		if (!e.target.hasAttribute('data-parte'))
			return false

		for (i = prox.getAttribute('data-parte'); i > 0 ; i--)
			prox = prox.previousSibling

		console.log(i)
		for (i; i.toString() === prox.getAttribute('data-parte'); i++) {
			prox.removeAttribute('data-moduloClasse')
			prox.removeAttribute('data-moduloCor')
			prox.removeAttribute('data-parte')
			prox.removeAttribute('style')
			prox = prox.nextSibling
		}

		return true
	}

	render() {
		return (
			<i
				// ref={(isso) => this.isso = isso}
				className="modulo"
				// style={{opacity: this.state.mOpacity}}
				// data-moduloClasse={this.state.mClasse}
				// data-moduloCor={this.state.mCor}

				onMouseEnter={this.aoColocarMouse}
				onMouseOut={this.aoTirarMouse}
				onClick={this.aoClicarEsq}
				onContextMenu={this.aoClicarDir}
			></i>
		)
	}
}