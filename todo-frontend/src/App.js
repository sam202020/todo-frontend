import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'

class App extends Component {
  
  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="App">
          
        </div>
      );
    } else {
      return (
        <Login />
      );
    }
  }
}

export default App;
