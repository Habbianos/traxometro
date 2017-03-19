import React, { Component } from 'react';
import './Traxometro.css';
import Principal from './Principal'
import MudarLista from './MudarLista'

class Traxometro extends Component {
	constructor(props){
	    super(props);

		const DbCartuchos = require('./db/cartuchos.json').cartuchos;
		DbCartuchos.sort((a, b) => {
			return a.id > b.id;
		});

		this.state = {
			pagina: "mudarLista",
			dbCartuchos: DbCartuchos
		};

		this.paginas = {
			"principal": <Principal mudarPagina={this.mudarPagina} />,
			"mudarLista": <MudarLista mudarPagina={this.mudarPagina} />
		}
	}

	mudarPagina = (nova_pagina) => {
		this.setState({
			pagina: nova_pagina
		})
	}

	render() {
		return (
			<div className="Traxometro" onCopy={() => alert('O código da música foi copiado.')} onPaste={() => confirm('Código Trax reconhecido, deseja substituir a música atual?')}>
				<audio></audio>
				{ this.paginas[this.state.pagina] }
			</div>
		);
	}
}

export default Traxometro;