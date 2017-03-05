import React, { Component } from 'react';
import './ListaSonsPager.css';

class ListaSonsPager extends Component {
	render() {
		return (
			<div className="ListaSonsPager">
				<input className="LeftPage" type="button" disabled />
				<span><span className="PageNow">1</span>/<span className="PageMax">X</span></span>
				<input className="RightPage" type="button" />
			</div>
		);
	}
}

export default ListaSonsPager;