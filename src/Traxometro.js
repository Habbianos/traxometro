import React, { Component } from 'react'
import * as firebase from 'firebase'
require('firebase/firestore')
import './Traxometro.css'
import Principal from './Principal/Principal'
import MudarLista from './MudarLista/MudarLista'
import CriadorMusica from './CriadorMusica/CriadorMusica'

function shuffle(array) {
	var m = array.length, t, i;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

class Traxometro extends Component {
	constructor(props){
	    super(props);

		const DbCartuchos = require('./db/cartuchos.json').cartuchos;
		DbCartuchos.sort((a, b) => {
			return a.id > b.id;
		});

		this.state = {
			pagina: 'principal',
			dbCartuchos: DbCartuchos,
			tocandoLista: false,
			musicas: null
		};

		this.paginas = {
			'principal': <Principal mudarPagina={this.mudarPagina} tocandoLista={()=>this.state.tocandoLista} tocarPausarLista={this.tocarPausarLista} />,
			'mudarLista': <MudarLista mudarPagina={this.mudarPagina} />,
			'criadorMusica': <CriadorMusica mudarPagina={this.mudarPagina} tocarPausarLista={this.tocarPausarLista} />
		}

		this.audio = {
			reprodutor: new Audio(),
			play: () => {
				this.audio.reprodutor.play()

				let titulo = this.audio.lista[this.audio.i_tocando].titulo
				let autor = this.audio.lista[this.audio.i_tocando].autor

				this.mostrarTocandoAgora(titulo, autor)
			},
			pause: () => this.audio.reprodutor.pause(),
			loop: (a = null) => {
				if (a !== null)
					this.audio.reprodutor.loop = a
				else
					return this.audio.reprodutor.loop
			},
			preload: (a = null) => {
				if (a !== null)
					this.audio.reprodutor.preload = a
				else
					return this.audio.reprodutor.preload
			},
			src: (a = null) => {
				if (a !== null)
					this.audio.reprodutor.src = a
				else
					return this.audio.reprodutor.src
			},
			next: () => {
				this.audio.i_tocando >= this.audio.lista.length - 1 ? this.audio.i_tocando = 0 : this.audio.i_tocando++
				this.audio.src(this.audio.lista[this.audio.i_tocando].src)
				this.audio.load()
			},
			load: () => this.audio.reprodutor.load(),
			inserir: (x) => {
				if (typeof x === 'string')
					this.audio.lista.push(x)
				else if (typeof x === 'object')
					for (let i = 0; i < x.length; i++)
						this.audio.lista.push(x[i])

				if (!this.audio.reprodutor.readyState)
					this.audio.src(this.audio.lista[this.audio.i_tocando].src)
			},
			limpar: () => this.audio.lista = [],
			i_tocando: 0,
			lista: []
		}
		// this.audio.loop(true)
		this.audio.preload(true)
		this.audio.inserir(shuffle([
			{
				src: './musicas/trax_disco.mp3',
				titulo: 'I love disco',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_bling.mp3',
				titulo: 'I love bling',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_electro.mp3',
				titulo: 'I love electronica',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_heavy.mp3',
				titulo: 'I love metal',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_8_bit.mp3',
				titulo: 'I love 8-bit',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_ambient.mp3',
				titulo: 'I love ambient',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_reggae.mp3',
				titulo: 'I love reggae',
				autor: 'Habbo Hotel'
			},
			{
				src: './musicas/trax_sfx.mp3',
				titulo: 'I love sfx',
				autor: 'Habbo Hotel'
			}
		]))
		this.audio.reprodutor.addEventListener('ended', () => {
			setTimeout(() => {
				this.audio.next()
				this.audio.play()
			}, 2000)
		})

		this.jukebox = {
			reprodutores: [],
			play: () => {
				for (let i = 0; i < this.jukebox.reprodutores.length; i++) {
					// this.jukebox.reprodutores[i].play()
				}

				if (this.jukebox.verificaInfoLoop === null) {
					this.jukebox.verificaInfoLoop = setInterval(() => {
						this.jukebox.tempoAtual += 2
						this.jukebox.verificaInfo()
					}, 2000)
					this.jukebox.verificaInfo();
				}
			},
			pause: () => {
				for (let i = 0; i < this.jukebox.reprodutores.length; i++) {
					this.jukebox.reprodutores[i].pause()

					clearInterval(this.jukebox.verificaInfoLoop)
				}
			},
			parar: () => {
				this.jukebox.tempoAtual = 0;
			},
			lista: [
				[],
				[],
				[],
				[]
			],
			code: null,
			inserir: (code) => {
				this.jukebox.code = code
				let info = this.reconhecerCodigoMusica(code)
				for (let i = 1; i < info.length; i++) {
					for (let j = 0; j < info[i].length; j++) {
						let som = this.buscaSomPeloId(info[i][j].somId) || this.buscaSomPeloId(0)
						this.jukebox.preLoad(som.arquivo)

						for (let k = 0; k < info[i][j].somDura / som.comprimento; k++) {
							for (let w = 0; k < som.comprimento; k++) {
								som.tocando = null;
								som.parte = w;
								this.jukebox.lista[i-1].push(Object.assign({},som))	
							}
						}
					}
				}


				// for (let i = 0; i < this.jukebox.reprodutores.length; i++) {
				// 	if (this.jukebox.lista[i].length) {
				// 		this.jukebox.lista[i][0].tocando = true
				// 		this.jukebox.reprodutores[i].src = './audios/'+this.jukebox.lista[i][0].arquivo
				// 		this.jukebox.reprodutores[i].play()
				// 	}
				// }
			},
			preLoad: (src) => {
				let audio = new Audio();
				audio.src = src
			},
			tempoAtual: 0,
			verificaInfoLoop: null,
			verificaInfo: () => {
				for (let i = 0; i < this.jukebox.lista.length; i++) {

					let modulo = this.jukebox.lista[i][this.jukebox.tempoAtual]
					if (modulo && modulo.parte === 0) {
						let audio = new Audio()
						audio.src = './audios/'+modulo.arquivo
						audio.onended = () => {
							this.jukebox.reprodutores.splice(this.jukebox.reprodutores.indexOf(audio), 1)
						}
						this.jukebox.reprodutores.push(audio)
						audio.play()
					}

					// for (let j = 0; j < this.jukebox.lista[i].length; j++) {

					// 	if (this.jukebox.lista[i][j].tocando === true) {

					// 		// PROBLEMA AQUI!!!
					// 		// J*2 NÃO REPRESENTA O "OFFSET", POIS PODE HAVER 5 ELEMENTOS COM COMPRIMENTO 1 (J ESTARIA CERTO) OU 5 ELEMENTOS COM COMPRIMENTO 4 (J ESTARIA 5)
					// 		if (this.jukebox.tempoAtual > j * 2 + this.jukebox.lista[i][j].comprimento * 2) {

					// 			this.jukebox.lista[i][j].tocando = false

					// 			if (this.jukebox.lista[i][j+1]) {
					// 				this.jukebox.lista[i][j+1].tocando = true
					// 				this.jukebox.reprodutores[i].src = './audios/'+this.jukebox.lista[i][j+1].arquivo
					// 				this.jukebox.reprodutores[i].play()
					// 			}
					// 		}
					// 		break
					// 	}
					// }
				}
				
				// let acabou = true
				// for (let i = 0; i < this.jukebox.lista.length; i++) {
				// 	for (let j = 0; j < this.jukebox.lista[i].length; j++) {
				// 		if (this.jukebox.lista[i][j].tocando === true) {
				// 			acabou = false
				// 			break
				// 		}
				// 	}
				// 	if (!acabou) break
				// }
				// if (acabou) this.jukebox.pause()
			}
		}
		// for (let i = 0; i < this.jukebox.reprodutores.length; i++) {
		// 	this.jukebox.reprodutores[i].addEventListener('ended', () => {
		// 		for (let j = 0; j < this.jukebox.lista[i].length; j++) {
		// 			let som_da_lista = this.jukebox.lista[i][j]
		// 			if (som_da_lista.tocando === true) {
		// 				som_da_lista.tocando = false;
		// 				if (this.jukebox.lista[i][j+1]) {
		// 					this.jukebox.lista[i][j+1].tocando = true
		// 					this.jukebox.reprodutores[i].src = './audios/'+this.jukebox.lista[i][j+1].arquivo
		// 					this.jukebox.play();
		// 				}
		// 			}
		// 		}
		// 	})
		// }
	}

	mudarPagina = (nova_pagina) => {
		this.setState({
			pagina: nova_pagina
		})
	}

	tocarPausarLista = (soRetorna = false) => {
		if (!soRetorna) {
			if (this.state.tocandoLista) {
				this.audio.pause();
				this.audio.currentTime = 0
				document.title = 'Traxômetro'
			} else
				this.audio.play()

			this.setState({
				tocandoLista: !this.state.tocandoLista
			})
		}
		
		return this.state.tocandoLista
	}

	mostrarTocandoAgora = (titulo, autor) => {
		let janela = document.querySelector('.tocando-agora')
		let msg1 = document.querySelector('.tocando-agora span:nth-of-type(1)')
		let msg2 = document.querySelector('.tocando-agora span:nth-of-type(2)')

		msg1.innerHTML = titulo
		msg2.innerHTML = autor
		janela.style.opacity = 1
		setTimeout(() => janela.style.opacity = 0, 5000)

		document.title = '▶ '+titulo+' / '+autor+' - '+document.title
	}

	reconhecerCodigoMusica = (codigo) => {
		// 'index' começa em 1, portanto o length ficou 5 com 4 elementos
		let info = [],
			a,
			b,
			c

		a = codigo.split(":")

		for (let i = 0; i < a.length; i += 2) {
			if (a[i] !== '') {
				b = a[i+1].split(";")
				for (let j = 0; j < b.length; j++) {
					c = b[j].split(",")
					b[j] = {
						somId: Number(c[0]),
						somDura: Number(c[1])
					}
				}
				info[a[i]] = b
			}
		}

		return info
	}

	buscaSomPeloId = (id) => {
		

		if (Number(id) === 0)
			return {
				"id": 0,
				"arquivo": "sound_machine_sample_0.mp3",
				"comprimento": 1
			}

		var firestore = firebase.firestore();

		return firestore.collection('sons').doc(id.toString()).get().then(function(doc) {
		    if (doc.exists) {
				return {
					"id": id,
					"arquivo": doc.data().arquivo,
					"comprimento": doc.data().comprimento,
					"index": doc.data().tipo
				}
		    } else {
				return {
					"id": 0,
					"arquivo": "sound_machine_sample_0.mp3",
					"comprimento": 1
				}
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
			return null
		});
	}

	componentDidMount() {
		// var firestore = firebase.firestore();
		// firestore.collection("musicas").limit(1).get().then((snap) => {
		// 	snap.docs.forEach((doc) => {
		// 		// console.log(doc.id, " => ", doc.data());
		// 		this.jukebox.inserir('1:9,8;0,1;1,2;0,5:2:4,4;0,1;7,2;0,1;2,2;0,1;3,2;0,1;9,2:3:0,2;1,1;0,4;4,4;0,2;5,2;0,1:4:0,16')
		// 		// this.jukebox.inserir(this.reconhecerCodigoMusica(doc.data().codigo))
		// 		this.jukebox.play()
		// 	})
		// })
		// this.jukebox.inserir('1:4,12;3,2;9,2;5,2;2,2:2:0,2;4,8;7,2;0,2;6,1;8,1;4,4:3:0,4;4,8:4::')
		// this.jukebox.inserir('1:9,8;0,1;1,2;0,5:2:4,4;0,1;7,2;0,1;2,2;0,1;3,2;0,1;9,2:3:0,2;1,1;0,4;4,4;0,2;5,2;0,1:4:0,16')
		// this.jukebox.play()
	}

	render() {
		return (
			<div className='Traxometro' onCopy={() => alert('O código da música foi copiado.')} onPaste={() => confirm('Código Trax reconhecido, deseja substituir a música atual?')}>
				<div className='tocando-agora' onClick={() => document.querySelector('.tocando-agora').style.opacity = 0}>Ouvindo agora <span></span> por <span></span></div>
				{ this.paginas[this.state.pagina] }
			</div>
		);
	}
}

export default Traxometro;