import React, { Component } from "react";
import WorldMap from "../maps/world-map";
import SideMenu from "../controls/side-menu";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={"main-container"}>
                <WorldMap />
            </div>
        );
    }
}
