import React, { Component } from 'react';
import "./Alerta.css";
import "./../../../Box/Box.css"

export default class Alerta extends Component {

	render() {
        let rodape;
        if (this.props.rodape) {
            rodape = (
                <footer>
                    { this.props.rodape }
                </footer>
            )
        }
		return (
			<div className="Alerta Caixa">
                <header>
					<button onClick={ this.props.rmvAlerta }>close</button>
                    <h1>{ this.props.titulo }</h1>
                </header>
                <main>
                    { this.props.corpo }
                </main>
                { rodape }
            </div>
		)
	}
}