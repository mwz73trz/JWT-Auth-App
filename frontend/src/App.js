import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StateCitiesPage from "./pages/StateCitiesPage";
import CityPage from "./pages/CityPage";
import UserContext from "./contexts/UserContext";

class App extends Component {
  state = {
    user: null,
  };

  updateUser = (newUserData) => {
    this.setState({ user: newUserData });
  };

  renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={this.updateUser} />;
  };

  render() {
    return (
      <div className="App">
        <Router>
          <UserContext.Provider value={this.state.user}>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact render={this.renderLoginPage} />
              <Route path="/login/users" exact component={SignupPage} />
              <Route
                path="/states/:stateId"
                exact
                component={StateCitiesPage}
              />
              <Route
                path="/states/:stateId/cities/:cityId"
                exact
                component={CityPage}
              />
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
