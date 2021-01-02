import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyBT7ZG6V1WAX7zoW3WBx075kQlUCWeQKKg",
  authDomain: "proy-react-fireb.firebaseapp.com",
  databaseURL: "https://proy-react-fireb.firebaseio.com",
  projectId: "proy-react-fireb",
  storageBucket: "proy-react-fireb.appspot.com",
  messagingSenderId: "245172047297",
  appId: "1:245172047297:web:21da819f1715d9fb133340",
  measurementId: "G-TB3NS2VN3C"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
