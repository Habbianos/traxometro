import React, { Component } from "react";
import "./BemVindo.css";
import "./../../../../componentes/Box/Box.css";

export default class BemVindo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            frame: 0
        }
    }
    componentWillReceiveProps(new_props) {
        this.setState({
            nome: new_props.user.nome || "fantasma"
        })
    }
    componentDidMount() {
        this.interval = setInterval(this.changeFrame, 100);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    changeFrame = () => {
        this.setState(prev_state => {
            return { frame: Number(!prev_state.frame) };
        });
    }
    render() {
        return (
            <div className="BemVindo Caixa">
                <header>
                    <h1>Bem vindo { this.state.nome }</h1>
                </header>
                <main>
                    <img src={ `https://www.habbo.com/habbo-imaging/avatarimage?user=${ this.state.nome }&action=wav&size=b&frame=${ this.state.frame }&direction=3&head_direction=3&gesture=sml` } alt="Usuário acenando." />
                </main>
            </div>
        )
    }
}