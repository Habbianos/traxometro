// handles interfacing with omggif-worker.js

import GifWorker from "./libraries/omggif.worker.js";

export default class MFAnimatedGIF {
    constructor(opts) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');

        canvas.width  = opts.width;
        canvas.height = opts.height;

        var frames = [];
        for(var i=0; i<opts.images.length; i++) {
            var animframe = (opts.rotations[i] === 0) ? opts.images[i] : this._rotate(opts.images[i], opts.rotations[i]);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(animframe, 0, 0, animframe.width, animframe.height, 0, 0, canvas.width, canvas.height);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            frames.push(imageData);
        }

        GifWorker({
            frames: frames,
            delay: opts.delay,
            matte: [255, 255, 255],
            transparent: [0, 255, 0]
        })
            .then((data) => {
                var info = data;
                info.binaryURL = this._binaryURL( data.buffer );
                info.rawDataURL = this._rawDataURL( data.string );
                info.dataURL = this._dataURL( info.rawDataURL );
                opts.done(info);
            })
            .catch((err) => {
                throw err;
            })

    }

    _rotate = function(image, rotation) {
        var canvas = document.createElement("canvas");

        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext('2d');
        ctx.translate(image.width/2, image.height/2);
        ctx.rotate(rotation * Math.PI / 180.0);
        ctx.drawImage(image, -image.width/2, -image.height/2, image.width, image.height);
        ctx.rotate(rotation * Math.PI / 180.0);
        ctx.translate(-image.width/2, -image.height/2);

        return canvas;
    };

    _rawDataURL = function(data) {
        // return $.base64.encode(data);
        return btoa(data);
    };

    _dataURL = function(rawData) {
        return 'data:image/gif;base64,' + rawData;
    };

    _binaryURL = function(data) {
        window.URL = window.URL || window.webkitURL;
        var blob = new Blob([data], {type: 'image/gif'});
        return window.URL.createObjectURL(blob);
    };

};
