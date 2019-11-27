import { getBirdData } from "../../api-requests/data-request";
import * as d3 from "d3";
import * as L from "leaflet";

const getData = async query => {
  return await getBirdData(query);
};

const radius = d3
  .scaleSqrt()
  .domain([0, 100000])
  .range([0, 15]);

const color = d3
  .scaleOrdinal()
  .domain(["duck sp.", "Sterna sp.", "swan sp.", "goose sp."])
  //.interpolate(d3.interpolateHcl)
  .range([d3.rgb("#507AFF"), d3.rgb("#FF4500")]);

const createCircles = (map, data) => {
  let svg = d3.select("g");

  const radialGradient = svg
    .append("defs")
    .append("radialGradient")
    .attr("id", "radial-gradient");

  radialGradient
    .append("stop")
    .attr("offset", "10%")
    .attr("stop-color", "#D3D3D3");

  radialGradient
    .append("stop")
    .attr("offset", "90%")
    .attr("stop-color", "#808080");

  let circles = svg.selectAll(".bird-circle").data(data);

  circles.exit().remove();

  circles
    .enter()
    .append("circle")
    .attr("class", "bird-circle")
    .attr("cx", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).x;
    })
    .attr("cy", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).y;
    })
    .attr("r", d => {
      return (
        radius(d.observationCount !== "X" ? d.observationCount : 10) *
        map.getZoom()
      );
    })
    .style("fill", function(d) {
      return color(d.commonName);
    })
    .attr("stroke", function(d) {
      return color(d.commonName);
    })
    .attr("stroke-width", 0.5)

    .attr("fill-opacity", 0.5);
};

const updateCircles = map => {
  d3.selectAll(".bird-circle")
    .attr("cx", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).x;
    })
    .attr("cy", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).y;
    })
    .attr("r", d => {
      return (
        radius(d.observationCount !== "X" ? d.observationCount : 10) *
        map.getZoom()
      );
    });
};

const timeScale = map => {
  d3.selectAll(".bird-circle")
    .attr("cx", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).x;
    })
    .attr("cy", function(d) {
      return map.latLngToLayerPoint(L.latLng(d.latitude, d.longitude)).y;
    });
};

export {
  getData as getBirdData,
  createCircles as createBirdCircles,
  updateCircles as updateBirdCircles,
  timeScale
};
