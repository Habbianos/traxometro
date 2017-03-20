import React, { Component } from 'react';
import './Traxometro.css';
import Principal from './Principal'
import MudarLista from './MudarLista'
import CriadorMusica from './CriadorMusica'

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
			tocandoLista: false
		};

		this.paginas = {
			'principal': <Principal mudarPagina={this.mudarPagina} tocarPausarLista={this.tocarPausarLista} />,
			'mudarLista': <MudarLista mudarPagina={this.mudarPagina} />,
			'criadorMusica': <CriadorMusica mudarPagina={this.mudarPagina} />
		}

		this.audio = {
			reprodutor: new Audio(),
			play: () => {
				this.audio.reprodutor.play()

				let janela = document.querySelector('.tocando-agora')
				let msg1 = document.querySelector('.tocando-agora span:nth-of-type(1)')
				let msg2 = document.querySelector('.tocando-agora span:nth-of-type(2)')

				msg1.innerHTML = this.audio.lista[this.audio.i_tocando].titulo
				msg2.innerHTML = this.audio.lista[this.audio.i_tocando].autor
				janela.style.opacity = 1;
				setTimeout(() => janela.style.opacity = 0, 5000)
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
			this.audio.next()
			this.audio.play()
		})
	}

	mudarPagina = (nova_pagina) => {
		this.setState({
			pagina: nova_pagina
		})
	}

	tocarPausarLista = () => {
		if (this.state.tocandoLista) {
			this.audio.pause();
			this.audio.currentTime = 0
		} else
			this.audio.play()

		this.setState({
			tocandoLista: !this.state.tocandoLista
		})
		
		return this.state.tocandoLista
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