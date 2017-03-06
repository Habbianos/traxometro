import React, { Component } from 'react';
import './ListaSons.css';
import ListaSonsPager from './ListaSonsPager';

class ListaSons extends Component {
	constructor(props){
	    super(props);
		this.state = {
			page: 1
		}
	}

	changePage = (dir) => {
		if (this.state.page+dir >= 1 && this.state.page+dir <= Math.ceil(this.props.children.length / 3))
			this.setState({
				page: this.state.page+dir
			});
	}

	render() {
		let cartuchos = [];
		for (let i = 0; i < this.props.children.length; i++) {
			if (
				i >= (this.state.page - 1) * 3 && 
				i <= (this.state.page - 1) * 3 + 2
			)
				cartuchos.push(this.props.children[i]);
		}

		if (cartuchos.length === 0 && this.state.page)
			this.changePage(-1);

		return (
			<div className="ListaSons">
				<ul>
					{ cartuchos }
				</ul>
				<ListaSonsPager pageA={this.props.children.length ? this.state.page : 0} pageM={Math.ceil(this.props.children.length / 3)} changePage={this.changePage} />
			</div>
		);
	}
}

export default ListaSons;