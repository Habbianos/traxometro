import { Component } from "react";
import firebase from "firebase";
import "firebase/firestore";
import Musica from "./componentes/Musica/Musica";

export default class Jukebox extends Component {
    constructor(props) {
        super(props);

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                user: user
            });
            console.log("user.uid", user.uid)
        });
        
        this.musica_atual = undefined;
        this.fila_musicas = [];

        this._getMusicas();
    }

    _getMusicas = (n = 5) => {
        const self = this;

        let startAt = Math.random().toString(36).substring(12);
        firebase.firestore().collection("musicas").orderBy("nome").startAt(startAt).limit(n).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    self._adcMusica(doc.data(), doc.ref);
                })
                this.tocarPrimeiro();
            })
    }

    _like = ref => {
        this._changeLikeDislike(ref, true)        
    }
    _dislike = ref => {
        this._changeLikeDislike(ref, false)
    }
    _changeLikeDislike = (ref, new_value) => {
        firebase.firestore().collection("reacoes").where("musica_ref", "==", ref).where("user_uid", "==", this.state.user.uid).get()
            .then(snap => {
                if (snap.empty) {
                    firebase.firestore().collection("reacoes").add({
                        musica_ref: ref,
                        user_uid: this.state.user.uid,
                        reacao: new_value
                    })
                } else {
                    snap.forEach(doc => {
                        if (doc.data().reacao === !new_value)
                            doc.ref.update({
                                reacao: new_value
                            })
                        else
                            doc.ref.delete();
                    })
                }
            })
    }
    _fav = ref => {
        firebase.firestore().collection("favoritos").where("musica_ref", "==", ref).where("user_uid", "==", this.state.user.uid).get()
            .then(snap => {
                if (snap.empty) {
                    firebase.firestore().collection("favoritos").add({
                        musica_ref: ref,
                        user_uid: this.state.user.uid
                    })
                } else {
                    snap.forEach(doc => {
                        doc.ref.delete();
                    })
                }
            })       
    }
    _rmv = musica => {
        if (this.musica_atual === musica)
            this._proxima();
    }

    _proxima = () => {
        this.musica_atual = undefined;
        setTimeout(this.tocarPrimeiro, 2000);
    }

    _adcMusica = (data, ref) => {
        let musica = new Musica(data);
        let loading_noti;
        if (this.musica_atual === undefined && this.fila_musicas.length === 0)
            loading_noti = this.props.adcNoti(`As músicas estão sendo carregadas`);

        const self = this;
        musica.onended = function() {
            let btns = {
                like: () => self._like(ref),
                dislike: () => self._dislike(ref),
                fav: () => self._fav(ref),
                rmv: () => self._rmv(musica),
            },
                noti = self.props.adcNoti(`Você ouviu ${this.nome} por ${this.autor}`, btns);

            firebase.firestore().collection("reacoes").where("musica_ref", "==", ref).where("user_uid", "==", self.state.user.uid)
                .onSnapshot(snap => {
                    if (!snap.empty)
                        snap.forEach(doc => btns.reacao = doc.data().reacao);
                    else
                        btns.reacao = undefined;
                    noti.update({ btns })
                })
            firebase.firestore().collection("favoritos").where("musica_ref", "==", ref).where("user_uid", "==", self.state.user.uid)
                .onSnapshot(snap => {
                    btns.faved = !snap.empty;
                    noti.update({ btns })
                })

            self._proxima();
        }
        musica.onplay = function() {
            if (loading_noti !== undefined)
                loading_noti.rmv();

            self.props.adcNoti(`Ouvindo agora ${this.nome} por ${this.autor}`);
        }
        musica.ontimeupdate = function() {
            if (this.progress >= 0.75) {
                self.props.adcNoti(`A seguir ${self.fila_musicas[0].nome} por ${self.fila_musicas[0].autor}`);
                this.ontimeupdate = () => {};
            }
        }
        this.fila_musicas.push(musica);
    }

    tocarPrimeiro = () => {
        if (this.fila_musicas.length < 3) {
            this._getMusicas(5);
        }

        if (this.fila_musicas.length > 0) {
            if (this.musica_atual === undefined) {
                this.musica_atual = this.fila_musicas.shift();
                this.musica_atual.play();
            }
        }
    }

    render() {
        return null;
    }
}