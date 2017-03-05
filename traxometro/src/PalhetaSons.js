import React, { Component } from 'react';
import './PalhetaSons.css';
import './modulos-e-cores.css';

class PalhetaSons extends Component {
	render() {
		this.state = {
			cor: this.props.cor || 1,
			cartucho: this.props.children || {}
		};

		return (
			<div className="PalhetaSons">
				<h1
					className={this.state.cartucho.id ? "header" : null}
					data-moduloCor={this.state.cor}
				>
					<span>{this.state.cartucho.nome}</span>
				</h1>
				<ul>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="1" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="2" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="3" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="4" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="5" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="6" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="7" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="8" data-moduloCor={this.state.cor}></i>) : null}
					</li>
					<li>
						{this.state.cartucho.id ? (<i className="modulo" data-moduloClasse="9" data-moduloCor={this.state.cor}></i>) : null}
					</li>
				</ul>
			</div>
		)
	}
}

export default PalhetaSons;