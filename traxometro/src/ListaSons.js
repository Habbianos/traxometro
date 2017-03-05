import React, { Component } from 'react';
import './ListaSons.css';
import ListaSonsPager from './ListaSonsPager';

class ListaSons extends Component {
	render() {
		return (
			<div className="lista-sons">
				<ul>
					{ this.props.children }
				</ul>
				<ListaSonsPager />
			</div>
		);
	}
}

export default ListaSons;