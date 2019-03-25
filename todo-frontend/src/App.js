import React, { Component } from 'react';
import './App.css';
import Login from './components/Login'
import Signin from './components/Register'
import { retrieveUserFromLocalStorage } from './components/Authentication'
import LoginComponent from './components/Login';

const userName = retrieveUserFromLocalStorage();
console.log(userName)

class App extends Component {

  render() {
    if (userName) {
      return (
        <div className="App">
          {userName}
        </div>
      );
    } else {
      return (
        <LoginComponent />
      );
    }
    return <Login />
  }
}

export default App;
