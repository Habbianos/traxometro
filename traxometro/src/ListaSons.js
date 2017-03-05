import React, { Component } from 'react';
import './ListaSons.css'

class ListaSons extends Component {
	render() {
		return (
			<div className="lista-sons">
				<ul>
					{ this.props.children }
				</ul>
			</div>
		);
	}
}

export default ListaSons;