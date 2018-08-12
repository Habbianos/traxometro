import React, { Component } from "react";
import "./Botao.css";

export default class Botao extends Component {
    constructor(props) {
        super(props);

        this.state = {
            actived: false,
        };
    }

    handleClick = e => {
        e.preventDefault();
        
        this.props.onClick();
    }

    render() {
        return (
            <button className={"Botao "+this.props.cor+(this.props.actived ? " actived" : "")} onClick={ this.handleClick }>
                <i className={this.props.tipo}></i>
            </button>
        )
    }
}