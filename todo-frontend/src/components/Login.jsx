import React from "react";
import { addNewUser } from "./Authentication";
import { Login } from "react-cognito/src/Login.jsx";
import { connect } from "react-redux";

class LoginComponent extends React.Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    console.log(addNewUser(email, password));
  };

  render() {
    return (
      <Login>
        <form onSubmit={this.submit}>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </Login>
    );
  }
}

export default connect()(LoginComponent);
