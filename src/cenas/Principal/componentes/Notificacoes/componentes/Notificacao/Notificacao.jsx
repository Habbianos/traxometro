import React, { Component } from "react";
import "./Notificacao.css";
import Botao from  "./componentes/Botao/Botao";

export default class Notificacao extends Component {
    constructor(props) {
        super(props);

        let duration = this.props.duration || 10000;
        this.timeout = setTimeout(this.autoRemove, duration);

        this.state = {
            class: "",
        }
    }
    componentWillUnmount() {
        clearTimeout(this.timeout)
    }
    
    autoRemove = () => {
        this.setState({
            class: "fadeout"
        });
        this.timeout = setTimeout(() => {
            this.props.rmvNoti(this.props.notiKey)
        }, 1500);
    }
    
    handleMouseEnter = () => {
        this.setState({
            class: ""
        });
        clearTimeout(this.timeout);
    }
    
    render() {
        let btns = [];
        if (this.props.btns !== undefined) {
            if (this.props.btns.like !== undefined) {
                btns.push(
                    <Botao cor="verde" tipo="like" key="like" actived={this.props.btns.reacao === true} onClick={ this.props.btns.like } />
                )
            }
            if (this.props.btns.dislike !== undefined) {
                btns.push(
                    <Botao cor="vermelho" tipo="dislike" key="dislike" actived={this.props.btns.reacao === false} onClick={ this.props.btns.dislike } />
                )
            }
            if (this.props.btns.fav !== undefined) {
                btns.push(
                    <Botao cor="amarelo" tipo="fav" key="fav" actived={this.props.btns.faved} onClick={ this.props.btns.fav } />
                )
            }
            if (this.props.btns.rmv !== undefined) {
                btns.push(
                    <Botao cor="azul" tipo="rmv" key="rmv" onClick={ this.props.btns.rmv } />
                )
            }
        }

        return (
            <div className={"Notificacao "+this.state.class} onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.autoRemove } >
                <div>
                    { btns }
                </div>
                <div>
                    { this.props.texto }
                </div>
            </div>
        )
    }
}