import React, { Component } from 'react';
import ReactDOM from "react-dom";
import "./Alertas.css";
import Alerta from "./componentes/Alerta/Alerta"

export default class Alertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alertas: [],
            max_zIndex: 1
        }
        this.props.setAdcAlert(this.adcAlerta);

    }
    
    max_zIndex = () => {
        let new_zIndex = this.state.max_zIndex + 1;
        this.setState({
            max_zIndex: new_zIndex
        });
        return new_zIndex;
    }
    maxTop = () => {
        return ReactDOM.findDOMNode(this).offsetHeight;
    }
    maxLeft = () => {
        return ReactDOM.findDOMNode(this).offsetWidth;
    }

    adcAlerta = (titulo, corpo, rodape) => {
        let key = Math.random().toString(36).substr(2, 9),
            novo_alerta = (
            <Alerta 
                key={ key }
                titulo={ titulo }
                corpo={ corpo }
                rodape={ rodape }
                rmvAlerta={ () => this.rmvAlerta(key) }
                max_zIndex={ this.max_zIndex }
                maxTop={ this.maxTop }
                maxLeft={ this.maxLeft }
            />
        )
        
        this.setState(prev_state => ({
            alertas: prev_state.alertas.concat(novo_alerta)
        }));
    }

    rmvAlerta = (key) => {
        this.setState((prev_state) => {
            const alertas = prev_state.alertas.filter(alerta => alerta.key !== key);
            return { alertas };
        })
    }
    
	render() {
		return (
			<div className="Alertas">
                { this.state.alertas }
            </div>
		)
	}
}