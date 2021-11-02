import { Component } from "react";
import { Link } from "react-router-dom";
import jwtAPI from "../api/jwtAPI";
import UserContext from "../contexts/UserContext";

class StateCitiesPage extends Component {
  state = {
    state: null,
  };

  getState = async () => {
    try {
      let stateId = this.props.match.params.stateId;
      let token = this.context ? this.context.token : null;
      let stateData = await jwtAPI.getStateById(stateId, token);
      if (stateData) {
        this.setState({ state: stateData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getState();
  }

  addCity = async () => {
    try {
      let inputName = document.getElementById("new-city-name");
      let token = this.context ? this.context.token : null;
      if (inputName && token) {
        let newCityParams = {
          state: this.state.state.id,
          name: inputName.value,
          been: false,
        };
        let data = await jwtAPI.addCity(newCityParams, token);
        if (data) {
          this.getState();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderCities() {
    let cityElements = this.state.state.cities.map((city, index) => {
      return (
        <li key={`city-${index}`}>
          <Link to={`/states/${this.state.state.id}/cities/${city.id}`}>
            {city.name}
          </Link>
        </li>
      );
    });
    return (
      <ul type="simple-list" style={{ listStyle: "none" }}>
        {cityElements}
      </ul>
    );
  }
  renderState() {
    if (!this.state.state) {
      return <p>No Cities Found!</p>;
    }
    return (
      <div>
        <h1>{this.state.state.name}</h1>
        {this.renderCities()}
        <hr />
        <input id="new-city-name" placeholder="new city" />
        <button onClick={this.addCity}>Add City</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Cities Page</h1>
        {this.renderState()}
      </div>
    );
  }
}

StateCitiesPage.contextType = UserContext;

export default StateCitiesPage;
