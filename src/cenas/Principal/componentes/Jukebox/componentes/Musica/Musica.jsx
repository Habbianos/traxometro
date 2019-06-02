import * as firebase from "firebase";
import "firebase/firestore";
import Crunker from "./extras/crunker";

export default class Musica {
	constructor({hotel, nome, autor, codigo} = {}) {
		this.nome = decodeURIComponent(nome);
		this.autor  = decodeURIComponent(autor);
		this.hotel = hotel;
		if (codigo !== undefined) {
			this.code = codigo;
		}
	}

	set code(code) {
		this._code = code;
		this._decode()
			.then(camadas => this._crateAudio(camadas))
			.then(() => {
				if (this._onaudiocreated !== undefined) this._onaudiocreated();
			});
	}
	get code() {
		return this._code;
	}

	play = () => {
		if (this.element !== undefined) {
			this._wantPlay = false;
			this.element.play();
		} else {
			this._wantPlay = true;
		}
	}

	set onplay(func) {
		if (this.element !== undefined) {
			this._wantSetOnplay = null;
			this.element.onplay = func.bind(this);
		} else {
			this._wantSetOnplay = func;
		}
	}

	set onended(func) {
		if (this.element !== undefined) {
			this._wantSetOnended = null;
			this.element.onended = func.bind(this);
		} else {
			this._wantSetOnended = func;
		}
	}

	set ondecoded(func) {
		this._ondecoded = func.bind(this);
	}

	set onaudiocreated(func) {
		this._onaudiocreated = func.bind(this);
	}

	set ontimeupdate(func) {
		if (this.element !== undefined) {
			this._wantSetOntimeupdate = null;
			this.element.ontimeupdate = func.bind(this);
		} else {
			this._wantSetOntimeupdate = func;
		}
	}

	get progress() {
		return this.element !== undefined ? this.element.currentTime / this.element.duration : 0;
	}

	_decode = async () => {
		// let camadas = this._decode_getCamadas(codigo);
		// camadas = this._decode_transformModules(camadas);
		// camadas = await this._decode_transformFiles(camadas);
		// return camadas;

		return await this._decode_getCamadas(this._code)
			.then(cmd => this._decode_transformModules(cmd))
			.then(cmd => {
				if (this._ondecoded !== undefined) this._ondecoded();
				return this._decode_transformFiles(cmd)
			});
	}
	
	_decode_getCamadas = async (codigo) => {
		return new Promise(resolve => {
			let split1 = codigo.split(":");
			let camadas = [];
			for (let i = 0; i < 4; i += 2) {
				if (split1[i+1].length > 0)
					camadas[Number(split1[i])-1] = split1[i+1];
			}
			resolve(camadas);
		})
	}
	_decode_transformModules = async (camadas) => {
		return new Promise(resolve => {
			camadas = camadas.map((camada) => {
				let blocos = camada.split(";");
				blocos.map((bloco, i, arr) => {
					let split = bloco.split(",");
					
					arr[i] = {song: split[0], duration: split[1]};
					return false;
				})
				return blocos;
			})
			resolve(camadas);
		})

	}
	_decode_transformFiles = async (camadas) => {
		var storage = firebase.storage();

		return new Promise(resolve => {
			let decode = new Promise((resolve_decode) => {
				let analyzCamadas = [];
				// eslint-disable-next-line
				camadas.map((camada, i, arr) => {
					let analyzCamada = new Promise((resolve_camada) => {
						let analyzBlocos = [];
						// eslint-disable-next-line
						camada.map((bloco, i, arr) => {
							let analyzArquivo = new Promise((resolve_arquivo) => {
								firebase.firestore().collection("sons").doc(bloco.song).get()
									.then((doc) => {
										const data = doc.data();
										bloco.times = bloco.duration / data.comprimento;
										
										storage.ref().child(`songs/${data.arquivo}`).getDownloadURL()
											.then(function(url) {
												bloco.url = url;
												resolve_arquivo(bloco);
											}).catch(function(err) {
												throw new Error("O som "+data.arquivo+" não foi encontrado: "+err.message);
											});
										})
									})
							analyzArquivo.then((a) => {
								arr[i] = a;
							})
							analyzBlocos.push(analyzArquivo)
						})
						Promise.all(analyzBlocos)
							.then((b) => {
								arr[i] = b;
								resolve_camada(b);
							})
						
					})
					analyzCamadas.push(analyzCamada);
				})
				Promise.all(analyzCamadas)
					.then((v) => {
						resolve_decode(v);
					})
			})
			decode.then(() => {
				resolve(camadas)
			})
		});
	}

	_crateAudio = (camadas) => {
		return new Promise(resolve => {
			let audio = new Crunker();
						
			let layers = [];
			// eslint-disable-next-line
			camadas.map((camada) => {
				let urls = []
				// eslint-disable-next-line
				camada.map((bloco) => {
					for (let i = 0; i < bloco.times; i++) {
						urls.push(bloco.url)
					}
				})
				layers.push(audio.fetchAudio(...urls).then(buffers => audio.concatAudio(buffers)))
			})

			if (layers.length === 0) {
				console.log(`Áudio vazio.`, this);
				return
			};
			Promise.all(layers)
				.then(concated => audio.mergeAudio(concated))
				.then(merged => audio.export(merged, 'audio/mp3'))
				.then(output => {
					this.element = output.element;
					this.element.preload = true;
					if (this._wantPlay === true) {
						this.play();
					}

					if (this._wantSetOnended !== null) {
						this.onended = this._wantSetOnended;
					}

					if (this._wantSetOnplay !== null) {
						this.onplay = this._wantSetOnplay;
					}

					if (this._wantSetOntimeupdate !== null) {
						this.ontimeupdate = this._wantSetOntimeupdate;
					}

					resolve();
				})
				.catch(error => {throw new Error(error)})
		})
	}
}