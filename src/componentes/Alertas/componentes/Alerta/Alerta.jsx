import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./Alerta.css";
import "./../../../Box/Box.css"

export default class Alerta extends Component {
    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this);
    }
    dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        this.setState({
            pos2: {
                x: e.clientX,
                y: e.clientY
            }
        });
        document.onmouseup = this.closeDragElement; // TODO: usar addEventListener
        document.onmousemove = this.elementDrag; // TODO: usar addEventListener
        this.element.style.zIndex = this.props.max_zIndex();
    }

    elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        this.setState({
            pos1: {
                x: this.state.pos2.x - e.clientX,
                y: this.state.pos2.y - e.clientY
            },
            pos2: {
                x: e.clientX,
                y: e.clientY
            }
        });
        let new_top = (this.element.offsetTop - this.state.pos1.y),
            new_left = (this.element.offsetLeft - this.state.pos1.x),
            half_height = Math.trunc(this.element.offsetHeight/2),
            half_width = Math.trunc(this.element.offsetWidth/2);
        
        if (new_top - half_height < 0) {
            new_top = half_height;
        } else if (new_top + half_height > this.props.maxTop()) {
            new_top = this.props.maxTop() - half_height;
        }
        if (new_left - half_width < 0) {
            new_left = half_width;
        } else if (new_left + half_width > this.props.maxLeft()) {
            new_left = this.props.maxLeft() - half_width;
        }

        this.element.style.top = new_top + "px";
        this.element.style.left = new_left + "px";
    }

    closeDragElement = () => {
        document.onmouseup = null; // TODO: usar removeEventListener
        document.onmousemove = null; // TODO: usar removeEventListener
    }

	render() {
        let rodape;
        if (this.props.rodape) {
            rodape = (
                <footer>
                    { this.props.rodape }
                </footer>
            )
        }

		return (
			<div className="Alerta Caixa">
                <header onMouseDown={ this.dragMouseDown }>
					<button onClick={ this.props.rmvAlerta }>close</button>
                    <h1>{ this.props.titulo }</h1>
                </header>
                <main>
                    { this.props.corpo }
                </main>
                { rodape }
            </div>
		)
	}
}