import React, { Component } from 'react';
import "./Alertas.css";
import Alerta from "./componentes/Alerta/Alerta"

export default class Alertas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alertas: []
        }
    }

    componentDidMount() {
        console.log(this.adcAlerta("Oi", "Nads"))
        console.log(this.adcAlerta("Oi2", "Nads2"))
    }

    adcAlerta = (titulo, corpo, rodape) => {
        let key = this.state.alertas.length,
        novo_alerta = (
            <Alerta titulo={ titulo } corpo={ corpo } rodape={ rodape } key={ key } rmvAlerta={ () => this.rmvAlerta(key) } />
        )
        console.log(titulo, key)
        this.setState({
            alertas: [...this.state.alertas, novo_alerta]
        });
    }

    rmvAlerta = (key) => {
        let novos_alertas = this.state.alertas.filter((alerta) => {
            return Number(alerta.key) !== key ? alerta : null;
        })
        this.setState({
            alertas: novos_alertas
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