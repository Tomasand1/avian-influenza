import React, { Component } from "react";
import * as d3 from "d3";
import * as L from "leaflet";
import "leaflet.heat";

import { getVirusData, createVirusCircles } from "../virus/virus-point-data";
import {
  createBirdCircles,
  getBirdData,
  updateBirdCircles,
  timeScale
} from "../birds/bird-point-data";
import TimeSlider from "../controls/time-slider";
import MoonLoader from "react-spinners/PropagateLoader";
import SideMenu from "../controls/side-menu";
import moment from "moment";

export default class WorldMap extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      width: Math.max(960, window.innerWidth),
      height: Math.max(500, window.innerHeight),
      rotated: 90,
      tau: 2 * Math.PI,
      baseScale: Math.max(960, window.innerWidth) / (2 * Math.PI),
      virusData: {},
      birdData: {}
    };
  }

  componentDidMount = async () => {
    const virusData = await getVirusData();
    // const birdData = await this.selectData("commonName=duck sp.");
    const birdData = await this.selectData("commonName=Sterna sp.");

    this.setState({
      virusData: virusData.data,
      birdData: birdData.data,
      loading: false
    });
  };

  componentDidUpdate = () => {
    console.log(this.map);
    if (this.map === undefined) this.createMap();
  };

  createMap = () => {
    this.map = L.map("map").setView([0, 0], 2);
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + mapLink + " Contributors",
      minZoom: 2,
      maxZoom: 10
    }).addTo(this.map);

    this.svg = L.svg().addTo(this.map);
    this.canvas = L.canvas().addTo(this.map);

    this.heatlayer = L.heatLayer([], { radius: 15 }).addTo(this.map);

    this.svg = d3.select("#map").select("svg");

    this.raster = this.svg.select("g");

    //this.filterData(new Date("2010-01-01"));

    this.map.on("moveend", this.zoomed);
  };

  handleDataChange = async data => {
    const birdDataS = await this.selectData(`commonName=${data}`);
    this.setState({
      birdData: this.state.birdData.concat(birdDataS.data),
      loading: false
    });
  };

  selectData = async types => {
    return await getBirdData(types);
  };

  filterData = h => {
    const newBirdData = this.state.birdData.filter(function(d) {
      const observationDate = new Date(d.observationDate);
      //console.log(moment(h).week())
      return (
        observationDate.getMonth() === h.getMonth() &&
        observationDate.getFullYear() === h.getFullYear() &&
        moment(observationDate).week() === moment(h).week()
      );
    });

    const newVirusData = this.state.virusData.filter(function(d) {
      const observationDate = new Date(d.observationDate);
      return (
        observationDate.getMonth() === h.getMonth() &&
        observationDate.getFullYear() === h.getFullYear()
      );
    });

    createBirdCircles(this.map, newBirdData);

    createVirusCircles(this.heatlayer, this.map, newVirusData);

    timeScale(this.map);
  };

  zoomed = () => {
    updateBirdCircles(this.map);
  };

  render() {
    if (this.state.loading)
      return (
        <div style={{ width: "100vw", height: "100vh" }}>
          <MoonLoader
            css={{
              position: "absolute",
              top: "45%",
              left: "49%"
            }}
            sizeUnit={"px"}
            size={20}
            color={"#91ebff"}
            loading={this.state.loading}
          />
        </div>
      );

    return (
      <React.Fragment>
        <SideMenu submit={this.handleDataChange} />

        <div id="map" className="main-canvas" ref="mainCanvas" />

        <TimeSlider
          width={this.state.width}
          height={this.props.height}
          filterData={this.filterData}
        />
      </React.Fragment>
    );
  }
}
