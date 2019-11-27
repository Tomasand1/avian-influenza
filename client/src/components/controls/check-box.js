import React, { Component } from "react";

export default class CheckBox extends Component {
    constructor() {
        super();

        this.state = {
            swan: false,
            goose: false,
            tern: true,
            duck: false,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.checked,
        });
    };

    render() {
        return (
            <div>
                <form style={{ display: "inline-block" }}>
                    <input
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
                    Ducks{" "}
                </form>
            </div>
        );
    }
}
