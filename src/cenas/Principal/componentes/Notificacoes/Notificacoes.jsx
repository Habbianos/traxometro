import React, { Component } from 'react';
import Notificacao from "./componentes/Notificacao/Notificacao";
import "./Notificacoes.css";

export default class Notificacoes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificacoes: []
        }
        this.props.setAdcNoti(this.adcNoti);
    }
    adcNoti = (texto, btns = {}) => {
        let key = Math.random().toString(36).substr(2, 9),
            nova_noti =  {
                key: key,
                notiKey: key,
                texto: texto,
                rmvNoti: () => this.rmvNoti(key),
                btns: btns
            }
        
        this.setState(prev_state => ({
            notificacoes: prev_state.notificacoes.concat(nova_noti)
        }));

        return { update: obj => {
            this.updateNoti(key, obj);
        }, rmv: () => {
            this.rmvNoti(key);
        }}
    }

    updateNoti = (key, {texto, btns} = {}) => {
        this.setState(prev_state => {
            const notificacoes = prev_state.notificacoes.map(noti => {
                if (noti.notiKey === key) {
                    if (texto !== undefined)
                        noti.texto = texto;
                    if (btns !== undefined)
                        noti.btns = btns;
                }
                return noti;
            })
            return { notificacoes }
        })
    }

    rmvNoti = (key) => {
        this.setState((prev_state) => {
            const notificacoes = prev_state.notificacoes.filter(noti => noti.key !== key);
            return { notificacoes };
        })
    }

    render() {
        return (
            <div className="Notificacoes">
                { this.state.notificacoes.map(noti => <Notificacao {...noti} />) }
            </div>
        )
    }
}