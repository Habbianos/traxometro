import React, { Component } from 'react'
import './MusicasSalvas.css';

export default class MusicasSalvas extends Component {
	render() {
		return (
			<div className="MusicasSalvas">
				<h2>Músicas Salvas</h2>
				<div className="lista">
					<select multiple>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
						<option>abc</option>
					</select>
				</div>
				<button className="editar">Editar música</button>
				<button className="excluir"></button>
			</div>
		)
	}
}