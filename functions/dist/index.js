"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const functions = require("firebase-functions");

const musica_1 = require("./extras/musica");

exports.generate_musica = functions.https.onRequest((request, response) => {
  const data = request.query.data;
  const song = musica_1.default(data);
  response.send(song);
});