import React from 'react'
import { registerUser } from 'react-cognito';

class Register extends React.Component {
    state = {
      error: '',
      username: '',
      password: '',
      email: '',
    };
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
    submit = (event) => {
      const { store } = this.context;
      const state = store.getState();
      const userPool = state.cognito.userPool;
      const config = state.cognito.config;
      event.preventDefault();
      registerUser(userPool, config, this.state.username, this.state.password, {
        email: this.state.email,
      }).then(
        (action) => {
          store.dispatch(action);
          this.props.history.push('/');
        },
        error => this.setState({ error }));
    }
    render() {
      return (
        <form onSubmit={this.submit} >
          <input name="email" value={this.state.email} onChange={this.onChange} />
          <input name="password" value={this.state.password} onChange={this.onChange} />
          <input type="submit" />
        </form>
      );
    }
  }
  
  export default Register;