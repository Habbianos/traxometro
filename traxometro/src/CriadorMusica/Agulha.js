import React, { Component } from 'react';
import './Agulha.css';

export default class Agulha extends Component {
	render() {
		return (
			<input type="range" className="Agulha" min="0" max="23" value="0" />
		)
	}
}