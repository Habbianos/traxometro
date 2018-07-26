import React, { Component } from 'react';
import "./Musica.css";

export default class Musica extends Component {
	constructor(props){
		super(props);

		this.state = {
			src: this.props.src,
			vol: 0.5
		}

		this.reprodutor = new Audio();
	}

	componentWillMount() {
		this.reprodutor.preload = true;
		this.reprodutor.src = this.state.src;
	}
	componentDidMount() {
		this.reprodutor.autoplay = true;
		this.reprodutor.loop = true;
		this.reprodutor.volume = this.state.vol;
	}
	componentDidUpdate() {
		this.reprodutor.volume = this.state.vol;
	}
	componentWillUnmount = (a) => {
		this.reprodutor.pause();
		delete this.reprodutor;
	}

	play() {
		this.reprodutor.play();
	}
	pause() {
		this.reprodutor.pause();
	}
	mudaMute() {
		if (this.state.vol > 0) {
			this.setState({vol: 0});
		} else {
			this.setState({vol: 0.5});
		}
	}

	handleInputChange(event) {
		this.setState({vol: Number(event.target.value)})
	}

	render() {
		return (
			<div className="Musica">
				<button onClick={ this.mudaMute.bind(this) } className={ this.state.vol > 0.9 ? 'max' : this.state.vol < 0.05 ? 'min' : '' }>Mute</button>
				<div>
					<input type="range" value={ this.state.vol } min="0" max="1" step="0.0001" onChange={this.handleInputChange.bind(this)} />
				</div>
			</div>
		)
	}
}