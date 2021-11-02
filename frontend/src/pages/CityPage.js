import { Component } from "react";
import jwtAPI from "../api/jwtAPI";
import UserContext from "../contexts/UserContext";

class CityPage extends Component {
  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  };

  state = {
    city: null,
    mode: CityPage.MODE_TYPE.VIEW,
  };

  getCity = async () => {
    try {
      let cityId = this.props.match.params.cityId;
      let token = this.context ? this.context.token : null;
      let cityData = await jwtAPI.getCityById(cityId, token);
      if (cityData) {
        this.setState({ city: cityData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  updateCity = async () => {
    try {
      let inputName = document.getElementById("city-name");
      let inputBeen = document.getElementById("city-been");

      let cityId = this.state.city.id;
      let token = this.context ? this.context.token : null;
      if (inputName && inputBeen && cityId > 0 && token) {
        let updatedCity = {
          state: this.state.city.state,
          name: inputName.value,
          been: inputBeen.checked,
        };
        let data = await jwtAPI.updateCity(cityId, updatedCity, token);
        if (data) {
          this.setState({ city: data });
          this.changeMode(CityPage.MODE_TYPE.VIEW);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteCity = async () => {
    try {
      let stateId = this.state.city.state;
      let cityId = this.state.city.div;
      let token = this.context ? this.context.token : null;
      if (cityId > 0 && token) {
        let result = await jwtAPI.deleteCity(cityId, token);
        if (result.success) {
          this.props.history.push(`/states/${stateId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getCity();
  }

  renderCity() {
    if (!this.state.city) {
      return <p>No City Found!</p>;
    }
    if (this.state.mode === CityPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">Name: </h1>
            <input
              id="city-name"
              placeholder="name"
              defaultValue={this.state.city.name}
            />
          </div>
          <div>
            <h3 className="nonbreak">Been: </h3>
            <input
              id="city-been"
              type="checkbox"
              defaultChecked={this.state.city.been}
            />
          </div>
          <br />
          <button onClick={this.updateCity}>Save</button>
          <button onClick={() => this.changeMode(CityPage.MODE_TYPE.VIEW)}>
            Cancel
          </button>
        </div>
      );
    }
    return (
      <div>
        <h3>{this.state.city.name}</h3>
        <h3>Been: {this.state.city.been ? "YES" : "NO"}</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>City Page</h1>
        {this.renderCity()}
        <hr />
        <button onClick={() => this.changeMode(CityPage.MODE_TYPE.UPDATE)}>
          Update
        </button>
        <button onClick={this.deleteCity}>Delete</button>
      </div>
    );
  }
}

CityPage.contextType = UserContext;

export default CityPage;
