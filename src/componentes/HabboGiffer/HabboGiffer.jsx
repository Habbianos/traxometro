import React, { Component } from "react";
import MFAnimatedGIF from "./extras/mfanimated";

export default class HabboGiffer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: undefined
        }

        let {
            hotel = "com",// || "com.br" || "es" || "nl" || "de" || "fi" || "tr" || "it" || "fr",
            figure,
            user,
            action = "std",// || "sit" || "wav" || "wlk" || "lay" || "crr" || "drk" || "lay" || "l",
            frame,
            gesture = "none",// || "sml" || "srp" || "sad" || "agr" || "eyb" || "spk" || "l" || "lam" || "ley" || "lsa" || "lsm" || "lsp" || "lsr",
            size = "b",// || "s" || "l",
            direction = 2,// || 1 || 3 || 4 || 5 || 6 || 7,
            head_direction = 2,// || 1 || 3 || 4 || 5 || 6 || 7,
            headonly = 0,// || 1,
            img_format = "png"// || "gif"
        } = this.props;

        switch (hotel) {
            case "com":
            case "com.br":
            case "es":
            case "nl":
            case "de":
            case "fi":
            case "tr":
            case "it":
            case "fr":
                break;
            default:
                throw new Error("You must provide one of these hotels: com, com.br, es, nl, de, fi, tr, it, fr.");
        }
        switch (action) {
            case "std":
            case "sit":
            case "wav":
            case "wlk":
            case "lay":
            case "crr":
            case "drk":
                break;
            default:
                throw new Error("You must provide one of these actions: std, sit, wav, wlk, lay, crr, drk.");
        }
        switch (gesture) {
            case "none":
            case "sml":
            case "srp":
            case "sad":
            case "agr":
            case "eyb":
            case "spk":
                break;
            default:   
                throw new Error("You must provide one of these gestures: none, sml, srp, sad, agr, eyb, spk.");
        }
        switch (size) {
            case "b":
            case "s":
            case "l":
                break;
            default:
                throw new Error("You must provide one of these sizes: b, s, l.");
        }
        if (direction < 1 || direction > 7) {
            throw new Error("You must provide and direction between 1 and 7, included.");
        }
        if (head_direction < 1 || head_direction > 7) {
            throw new Error("You must provide and head direction between 1 and 7, included.");
        }
        switch (img_format) {
            case "png":
            case "gif":
                break;
            default:
                throw new Error("You must provide one of these image format: png, gif.");
        }

        let url = `https://www.habbo.${hotel}/habbo-imaging/avatarimage?`;

        if (user !== undefined) {
            url += `user=${user}`;
        } else if (figure !== undefined) {
            url += `figure=${figure}`;
        } else {
            throw new Error("You must provide an user or an figure string.");
        }

        if (action !== undefined) {
            url += `&action=${action}`;
        }

        if (size !== undefined) {
            url += `&size=${size}`
        }

        this.images = [];

        if (action === "wlk") {
            for (frame = frame || 0; frame < 4; frame++) {
                this.images.push(this.loadImage(url+`&frame=${frame}`));
            }
        } else if (action === "wav") {
            for (frame = frame || 0; frame < 2; frame++) {
                this.images.push(this.loadImage(url+`&frame=${frame}`));
            }
        } else {
            this.images.push(this.loadImage(url));
        }

        // TODO: Usar todos os props aceitáveis

        Promise.all(this.images)
            .then((imgs) => {
                new MFAnimatedGIF({ // TODO: Fazer um GifMaker próprio
                    images: imgs,
                    rotations: new Array(imgs.length).fill(0),
                    delay: 150,
                    height: imgs[0].height,
                    width: imgs[0].width,
                    done: this.done
                })
            })
    }

    loadImage = (src) => {
        return new Promise((resolve) => {
            let image = new Image();
            image.crossOrigin = '';
            image.src = src+"&"+(new Date().getTime());
            image.onload = () => resolve(image);
        })
    }

    done = (info) => {
        this.setState({ src: info.dataURL })
    }

    render() {
        return (
            <img alt="Habbo animated" src={ this.state.src } />
        )
    }
}