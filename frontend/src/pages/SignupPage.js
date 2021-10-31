import { Component } from "react";
import jwtAPI from "../api/jwtAPI";

class SignupPage extends Component {
  handleSignup = async (e) => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    let credentials = {
      username: username,
      password: password,
    };
    try {
      let data = await jwtAPI.signUpUser(credentials);
      if (data) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSignup}>
          <label>Username: </label>
          <input name="username" placeholder="username" />
          <br />
          <label>Password: </label>
          <input type="password" name="password" />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default SignupPage;
