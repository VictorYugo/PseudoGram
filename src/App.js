import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

import './App.css';

import FileUpload from "./FileUpload";

class App extends Component{
  constructor() {
    super();
    this.state = {
      user:null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
    });

    firebase.database().ref('pictures').on('child_added', snapshot =>{
      this.setState( {
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }
  
  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
  
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha cerrado sesión`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/Fotos/${file.name}`);
    const task = storageRef.put(file);
    
    task.on('state_changed' , snapshot =>{
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
            uploadValue : percentage
         })
    } , error =>{
        console.log(error.message)
    } , () => storageRef.getDownloadURL().then(url => {
        const record = {
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          image: url
        };
        const dbRef = firebase.database().ref('pictures');
        const newPicture = dbRef.push();
        newPicture.set(record);
    }));
  }
  
  renderLoginButton(){
    //Si hay un usuario que está logeado
    if (this.state.user){
      return( 
      <div>
        <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}></img>
        <p>Hola {this.state.user.displayName}!</p>
        <button onClick={this.handleLogout}>Salir</button>
        <FileUpload onUpload={this.handleUpload} uploadValue={
          this.state.uploadValue
        }></FileUpload>

        {
          this.state.pictures.map(picture => (
            <div>
              <img src={picture.image} alt=""></img>
              <br></br>
              <img src={picture.photoURL} alt={picture.displayName}></img>
              <br></br>
              <span>{picture.displayName}</span>
            </div>
          )).reverse()
        }

        </div>
      );
    } else {
    //Si no lo está
    return(
    <button onClick={this.handleAuth}>Login con Google</button>
    );
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Probando React con Fire Base</h2>
        </div>
        <p className = "App-intro">
          {this.renderLoginButton()}
        </p>
      </div>
    );
  }
  

}


export default App;
