import React, { Component } from "react";

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    this.setState({
      commonName: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state.commonName);
    this.props.submit(this.state.commonName);
  };

  render() {
    return (
      <div>
        <form style={{ display: "inline-block" }}>
          Common Name{" "}
          <input type="text" name="commonName" onChange={this.handleChange} />
          <button type="button" onClick={this.onSubmit} className="btn">
            Get!
          </button>
          {/* <input
                type="checkbox"
                name="swan"
                value="Swan"
                checked={this.state.swan}
                onChange={this.handleChange}
              />
              Swans{" "}
              <input
                type="checkbox"
                name="goose"
                checked={this.state.goose}
                value="Goose"
                onChange={this.handleChange}
              />
              Goose{" "}
              <input
                type="checkbox"
                name="tern"
                checked={this.state.tern}
                value="Tern"
                onChange={this.handleChange}
              />
              Terns{" "}
              <input
                type="checkbox"
                name="duck"
                checked={this.state.duck}
                value="Duck"
                onChange={this.handleChange}
              />
              Ducks{" "} */}
        </form>
      </div>
    );
  }
}
