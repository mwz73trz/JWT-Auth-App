import { Component } from "react";
import { Link } from "react-router-dom";
import jwtAPI from "../api/jwtAPI";
import States from "../components/States";
import UserContext from "../contexts/UserContext";

class HomePage extends Component {
  state = {
    states: [],
  };

  getStates = async () => {
    try {
      let token = this.context ? this.context.token : null;
      if (token) {
        let statesData = await jwtAPI.getStates(token);
        this.setState({ states: statesData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  createState = async () => {
    try {
      let input = document.getElementById("new-state-name");
      let token = this.context ? this.context.token : null;
      if (input && token) {
        let newStateParams = {
          name: input.value,
          user: this.context.user.id,
        };
        let data = await jwtAPI.createState(newStateParams, token);
        if (data) {
          let newStates = [...this.state.states, data];
          this.setState({ states: newStates });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteState = async (stateId) => {
    try {
      let token = this.context ? this.context.token : null;
      if (stateId > 0 && token) {
        let result = await jwtAPI.deleteState(stateId, token);
        if (result.success) {
          let newStates = this.state.states.filter((state, index) => {
            return state.id !== stateId;
          });
          this.setState({ states: newStates });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getStates();
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
    let stateElements = this.state.states.map((state, index) => {
      return (
        <li key={`state-${index}`}>
          <States state={state} handleDelete={this.deleteState} />
        </li>
      );
    });
    return (
      <div>
        <h2>Welcome {this.context.user.username}</h2>
        <h2>States</h2>
        <ul type="simple-list" style={{ listStyle: "none" }}>
          {stateElements}
        </ul>
        <hr />
        <input id="new-state-name" placeholder="state name" />
        <button onClick={this.createState}>Add New State</button>
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
