import { Component } from "react";
import { Link } from "react-router-dom";
import jwtAPI from "../api/jwtAPI";
import UserContext from "../contexts/UserContext";

class HomePage extends Component {
  state = {
    home: null,
  };

  getHomePage = async () => {
    try {
      let token = this.context ? this.context.token : null;
      if (token) {
        let homeData = await jwtAPI.displayHomePage(token);
        this.setState({ home: homeData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getHomePage();
  }

  renderWelcome() {
    if (!this.context) {
      return (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <br />
          <Link to="/login/users">Sign Up</Link>
        </div>
      );
    }
    return (
      <div>
        <h2>Welcome {this.context.user.username}</h2>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

HomePage.contextType = UserContext;

export default HomePage;
