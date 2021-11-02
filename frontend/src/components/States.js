import { Component } from "react";
import { Link } from "react-router-dom";

class States extends Component {
  render() {
    return (
      <span>
        <Link to={`/states/${this.props.state.id}`}>
          {this.props.state.name}
        </Link>
        <button onClick={() => this.props.handleDelete(this.props.state.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default States;
