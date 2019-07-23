import React, { Component } from "react";
import * as d3 from "d3";
import * as geoTile from "d3.geoTile";

export default class WorldMap extends Component {
    constructor() {
        super();

        this.state = {
            width: Math.max(960, window.innerWidth),
            height: Math.max(500, window.innerHeight),
            rotated: 90,
            tau: 2 * Math.PI,
        };
    }

    componentDidMount = () => {
        this.createMap();
    };

    componentDidUpdate = () => {
        this.createMap();
    };

    createMap = () => {
        this.projection = d3
            .geoMercator()
            .scale(1)
            .translate([0, 0])
            .fitSize([this.state.width, this.state.height]);

        this.path = d3.geoPath().projection(this.projection);

        this.tile = geoTile().size([this.state.width, this.state.height]);

        this.zoom = d3
            .zoom()
            .scaleExtent([1 << 11, 1 << 16])
            .on("zoom", this.zoomed);

        console.log(this.zoom.translateExtent());

        this.svg = d3
            .select("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height);

        this.raster = this.svg.append("g");

        this.svg
            .call(this.zoom)
            .call(
                this.zoom.transform,
                d3.zoomIdentity
                    .translate(this.state.width / 2, this.state.height / 2)
                    .scale(1 << 12),
            );
    };

    rotateMap = (scale, endX) => {
        this.projection.rotate([
            this.state.rotated +
                ((endX - 0) * 360) / (scale * this.state.width),
            0,
            0,
        ]);
        this.raster.selectAll("image").attr("d", this.path);
    };

    zoomed = () => {
        let transform = d3.event.transform;

        // if (transform.invertX(0) < -0.5) {
        //     transform.x = 0.5 * transform.k;
        // } else
        if (transform.invertY(0) < -0.5) {
            transform.y = 0.5 * transform.k;
        }
        // else if (transform.invertX(this.state.width) > 0.4) {
        //     transform.x =
        //         (transform.invertX(this.state.width) - 0.4) * transform.k;
        // }
        else if (transform.invertY(this.state.height) > 0.5) {
            transform.y =
                (transform.invertY(this.state.height) - 0.7) * transform.k;
        }

        let tiles = this.tile
            .scale(transform.k)
            .translate([transform.x, transform.y])();

        this.projection
            .scale(transform.k)
            .translate([transform.x, transform.y]);

        var image = this.raster
            .attr("transform", this.stringify(tiles.scale, tiles.translate))
            .selectAll("image")
            .data(tiles.filter(([x, y, z]) => Math.max(x, y) < 1 << z), d => d);

        image.exit().remove();

        image
            .enter()
            .append("image")
            .attr("xlink:href", function(d) {
                return (
                    "http://" +
                    "abc"[d[1] % 3] +
                    ".tile.openstreetmap.org/" +
                    d[2] +
                    "/" +
                    d[0] +
                    "/" +
                    d[1] +
                    ".png"
                );
            })
            .attr("x", function(d) {
                return `${d[0] * 256}px`;
            })
            .attr("y", function(d) {
                return `${d[1] * 256}px`;
            })
            .attr("width", 256)
            .attr("height", 256);

        this.rotateMap(transform.k, 1);
    };

    stringify = (scale, translate) => {
        let k = scale / 256,
            r = scale % 1 ? Number : Math.round;
        return (
            "translate(" +
            r(translate[0] * scale) +
            "," +
            r(translate[1] * scale) +
            ") scale(" +
            k +
            ")"
        );
    };
    render() {
        return (
            <div className="main-canvas" ref="mainCanvas">
                <svg />
            </div>
        );
    }
}
