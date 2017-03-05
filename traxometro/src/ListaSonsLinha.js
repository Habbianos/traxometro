import React, { Component } from 'react';
import './ListaSonsLinha.css';

class ListaSonsLinha extends Component {
	render() {
		return (
			<li className="ListaSonsLinha">{this.props.children}</li>
		);
	}
}

export default ListaSonsLinha;