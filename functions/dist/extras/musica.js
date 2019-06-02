"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

const admin = require("firebase-admin"); /// <reference path="crunker/crunker.d.ts" />


const Crunker = require("./crunker/crunker");

admin.initializeApp();

function musica(data) {
  const _decode_getCamadas =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(function* (codigo) {
      return new Promise(resolve_getCamadas => {
        const split1 = codigo.split(":");
        const camadas = [];

        for (let i = 0; i < 4; i += 2) {
          if (split1[i + 1].length > 0) camadas[Number(split1[i]) - 1] = split1[i + 1];
        }

        resolve_getCamadas(camadas);
      });
    });

    return function _decode_getCamadas(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  const _decode_transformModules =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(function* (camadas) {
      return new Promise(resolve => {
        const novas_camadas = camadas.map(camada => {
          const blocos = camada.split(";");
          blocos.map((bloco, i, arr) => {
            const split = bloco.split(",");
            arr[i] = {
              song: split[0],
              duration: split[1]
            };
            return false;
          });
          return blocos;
        });
        resolve(novas_camadas);
      });
    });

    return function _decode_transformModules(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  const _decode_transformFiles =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(function* (camadas) {
      return new Promise((resolve, reject) => {
        const decode = new Promise((resolve_decode, reject_decode) => {
          const analyzCamadas = []; // eslint-disable-next-line

          camadas.map((camada, i_camadas, arr_camadas) => {
            const analyzCamada = new Promise((resolve_camada, reject_camada) => {
              const analyzBlocos = []; // eslint-disable-next-line

              camada.map((bloco, i_camada, arr_camada) => {
                const analyzArquivo = new Promise((resolve_arquivo, reject_arquivo) => {
                  admin.firestore().collection("sons").doc(bloco.song).get().then(doc => {
                    const info = doc.data();
                    bloco.times = bloco.duration / info.comprimento;
                    admin.storage().bucket().file(`songs/${info.arquivo}`).getSignedUrl({
                      action: 'read',
                      expires: '03-09-2491'
                    }).then(function (url) {
                      bloco.url = url;
                      resolve_arquivo(bloco);
                    }).catch(function (err) {
                      throw new Error("O som " + info.arquivo + " não foi encontrado: " + err.message);
                    });
                  }).catch(err => reject_arquivo(err));
                });
                analyzArquivo.then(a => {
                  arr_camada[i_camada] = a;
                }).catch(err => reject_camada(err));
                analyzBlocos.push(analyzArquivo);
              });
              Promise.all(analyzBlocos).then(b => {
                arr_camadas[i_camadas] = b;
                resolve_camada(b);
              }).catch(err => reject_camada(err));
            });
            analyzCamadas.push(analyzCamada);
          });
          Promise.all(analyzCamadas).then(v => resolve_decode(v)).catch(err => reject_decode(err));
        });
        decode.then(() => resolve(camadas)).catch(err => reject(err));
      });
    });

    return function _decode_transformFiles(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  const _decode =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(function* (codigo) {
      return yield _decode_getCamadas(codigo).then(cmd => _decode_transformModules(cmd)).then(cmd => _decode_transformFiles(cmd));
    });

    return function _decode(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  const _createAudio = camadas => {
    return new Promise(resolve => {
      const audio = new Crunker();
      const layers = []; // eslint-disable-next-line

      camadas.map(camada => {
        const urls = []; // eslint-disable-next-line

        camada.map(bloco => {
          for (let i = 0; i < bloco.times; i++) {
            urls.push(bloco.url);
          }
        });
        layers.push(audio.fetchAudio(...urls).then(buffers => audio.concatAudio(buffers)));
      });

      if (layers.length === 0) {
        console.log(`Áudio vazio.`);
        return;
      }

      ;
      Promise.all(layers).then(concated => audio.mergeAudio(concated)).then(merged => audio.export(merged, 'audio/mp3')).then(output => resolve(output)).catch(error => {
        throw new Error(error);
      });
    });
  };

  return new Promise((resolve, reject) => {
    _decode(data).then(camadas => _createAudio(camadas)).then(audio => resolve(audio)).catch(err => reject(err));
  });
}

exports.default = musica;