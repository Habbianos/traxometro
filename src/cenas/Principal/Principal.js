import React, { Component, Fragment } from 'react'
import "./Principal.css";
import TraxMenu from "./componentes/TraxMenu/TraxMenu";
import Jukebox from "./componentes/Jukebox/Jukebox";
import Notificacoes from "./componentes/Notificacoes/Notificacoes";

export default class Principal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: (
				<Fragment>
					<TraxMenu />
				</Fragment>
			),
			adcNoti: () => {}
		}
	}

	setAdcNoti = (func) => {
		this.setState({
			adcNoti: func
		});
	}

	render() {
		return (
			<div className="Principal">
				<Notificacoes setAdcNoti={ this.setAdcNoti } />
				<Jukebox adcNoti={ this.state.adcNoti } />
				{ this.state.cena }
			</div>
		)
	}
}