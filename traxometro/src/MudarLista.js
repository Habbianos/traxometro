import React, { Component } from 'react'
import './MudarLista.css'
import MusicasSalvas from './MusicasSalvas';

export default class MudarLista extends Component {
	// Return an array of the selected opion values
	// select is an HTML select element
	getSelectValues = (select) => {
		let result = [];
		let options = select && select.options;
		let opt;

		for (let i = 0, iLen = options.length; i < iLen; i++) {
			opt = options[i];

			if (opt.selected)
				result.push(opt.value || opt.text);
		}
		return result;
	}

	pegaMusica = () => {
		let lista = document.querySelector(".MusicasSalvas select")
		console.log(this.getSelectValues(lista))
	}

	render() {
		return (
			<div className="MudarLista">
				<div className="cabecalho">
					<input type="button" className="fechar" value="" onClick={() => this.props.mudarPagina("principal")} />
					<h1>Editor da Lista</h1>
				</div>
				<div className="corpo">
					<MusicasSalvas />
					<button className="incluir" onClick={this.pegaMusica}></button>
				</div>
			</div>
		)
	}
}