import React, { Component, Fragment } from 'react'
import "./Principal.css";
import TraxMenu from "./componentes/TraxMenu/TraxMenu";

export default class Principal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cena: (
				<Fragment>
					<TraxMenu />
				</Fragment>
			)
		}
	}
	render() {
		return (
			<div className="Principal">
				{ this.state.cena }
			</div>
		)
	}
}