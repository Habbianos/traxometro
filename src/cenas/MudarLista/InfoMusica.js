import React, { Component } from 'react'
import './InfoMusica.css'

export default class InfoMusica extends Component {
	render() {
		return (
			<div className="InfoMusica">
				<h2>Informação da música</h2>
				<div className="info">
					<span>0:00 min</span>
					<button className="gravar">Gravar músicas</button>
				</div>
			</div>
		)
	}
}