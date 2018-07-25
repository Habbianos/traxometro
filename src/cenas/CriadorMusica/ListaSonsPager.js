import React, { Component } from 'react';
import './ListaSonsPager.css';

class ListaSonsPager extends Component {
	render() {
	    const {
	    	pageA,
	    	pageM,
	    	changePage
	    } = this.props;

	    let inputA = pageA <= 1,
	    inputB = pageA >= pageM;

		return (
			<div className="ListaSonsPager">
				<input
					className="LeftPage"
					type="button"
					onClick={() => changePage(-1)}
					disabled={inputA}
				/>
				<span><span className="PageNow">{pageA}</span>/<span className="PageMax">{pageM}</span></span>
				<input
					className="RightPage"
					type="button"
					onClick={() => changePage(1)}
					disabled={inputB}
				/>
			</div>
		);
	}
}

export default ListaSonsPager;