import React from 'react';
import ReactDOM from 'react-dom';
import Traxometro from './Traxometro';
import './index.css';
import * as firebase from 'firebase';

var config = {
	apiKey: "AIzaSyDpANc9RutVa1_ATWJ00pXK9ODvzC5UAPU",
	authDomain: "traxometro.firebaseapp.com",
	databaseURL: "https://traxometro.firebaseio.com",
	projectId: "traxometro",
	storageBucket: "traxometro.appspot.com",
	messagingSenderId: "362805206844"
};
firebase.initializeApp(config);

ReactDOM.render(
	<Traxometro />,
	document.getElementById('root')
);