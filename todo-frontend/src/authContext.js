import React, { Component } from 'react'
import { addNewUser, verifyExisitingUser, retrieveUserFromLocalStorage } from './components/Authentication'



const AuthContext = React.createContext();

export class AuthContext extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        isAuthenticated: false,
        username: '',
      };
    }
  
    authenticate = (username, password) => {
      this.setState({
        isAuthenticated: true,
        username: 'username',
      });
    };
  
    render() {
      const { children } = this.props;
  
      return (
        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            username: this.state.username
          }}
        >
          // TODO:  Render Snackbar presentation component here
        
          {children}
        </AuthContext.Provider>
      );
    }
  }
  
  export const AuthContext = AuthContext.Consumer;