import React, { Component } from "react";
import * as d3 from "d3";
import * as geoTile from "d3.geoTile";
import simpleheat from "simpleheat";
import {
    getVirusData,
    createVirusCircles,
    updateVirusCircles,
} from "../virus/virus-point-data";
import {
    createBirdCircles,
    getBirdData,
    updateBirdCircles,
} from "../birds/bird-point-data";
import TimeSlider from "../controls/time-slider";

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
            birdData: {},
        };
    }

    componentDidMount = async () => {
        const virusData = await getVirusData();
        const birdData = await getBirdData();

        this.setState({
            virusData: virusData.data,
            birdData: birdData.data,
            loading: false,
        });
    };

    componentDidUpdate = () => {
        this.createMap();
    };

    createMap = () => {
        this.projection = d3
            .geoMercator()
            .scale(1 / this.state.tau)
            .translate([0, 0]);
        //.fitSize([this.state.width, this.state.height]);

        this.geoProjection = d3
            .geoMercator()
            .scale(this.state.baseScale)
            .center(this.projection.invert([0, 0]))
            .translate([0, 0]);

        this.path = d3.geoPath().projection(this.projection);

        this.tile = geoTile().size([this.state.width, this.state.height]);

        this.zoom = d3
            .zoom()
            .scaleExtent([1 << 11, 1 << 20])
            .on("zoom", this.zoomed);

        this.svg = d3.select("svg");

        this.raster = this.svg.select("g");

        this.circleSvg = createVirusCircles(
            this.geoProjection,
            this.refs,
            this.state.virusData,
        );

        this.birdCircles = createBirdCircles(
            this.geoProjection,
            this.refs,
            this.state.birdData,
        );

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
        this.raster.selectAll("image").attr("x", this.path);
    };

    updateGeoProjection = (projectionScaleFactor, transform) => {
        if (
            this.geoProjection.scale() ===
            projectionScaleFactor * this.state.baseScale
        ) {
            this.geoProjection.translate([transform.x, transform.y]);
        } else {
            this.geoProjection.translate([transform.x, transform.y]);
            this.geoProjection.scale(
                this.state.baseScale * projectionScaleFactor,
            );
        }
    };

    restrictDrag = transform => {
        // TODO: find height of the svg
        if (transform.invertY(0) < -0.5) {
            transform.y = 0.5 * transform.k;
        } else if (transform.invertY(this.state.height) > 0.5) {
            transform.y =
                (transform.invertY(this.state.height) - 0.7) * transform.k;
        }
    };

    filterData = h => {
        const newBirdData = this.state.birdData.filter(function(d) {
            return (
                new Date(d.observationDate) >= h &&
                new Date(
                    new Date(d.observationDate).setMonth(
                        new Date(d.observationDate).getMonth() - 2,
                    ),
                ) <= h
            );
        });

        const newVirusData = this.state.virusData.filter(function(d) {
            return (
                new Date(d.observationDate) >= h &&
                new Date(
                    new Date(d.observationDate).setMonth(
                        new Date(d.observationDate).getMonth() - 2,
                    ),
                ) <= h
            );
        });

        this.birdCircles = createBirdCircles(
            this.geoProjection,
            this.refs,
            newBirdData,
        );

        this.circleSvg = createVirusCircles(
            this.geoProjection,
            this.refs,
            newVirusData,
        );

        updateBirdCircles(this.geoProjection);
        updateVirusCircles(this.geoProjection, this.projectionScaleFactor);
    };

    zoomed = () => {
        const transform = d3.event.transform;

        this.projectionScaleFactor = transform.k / this.state.width;

        //let translate0 = this.geoProjection.translate();

        this.restrictDrag(transform);

        this.updateGeoProjection(this.projectionScaleFactor, transform);

        this.createTileImage(transform);

        updateVirusCircles(
            this.geoProjection,
            this.projectionScaleFactor,
            this.refs,
        );
        updateBirdCircles(this.geoProjection, this.projectionScaleFactor);

        // this.rotateMap(
        //     transform.k,
        //     d3.event.pageX -
        //         document.getElementById("svg").getBoundingClientRect().x +
        //         10,
        // );
    };

    createTileImage = transform => {
        const tiles = this.tile
            .scale(transform.k)
            .translate([transform.x, transform.y])();

        this.projection
            .scale(transform.k)
            .translate([transform.x, transform.y]);

        const image = this.raster
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
    };

    stringify = (scale, translate) => {
        const k = scale / 256,
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
        if (this.state.loading) return <div />;

        this.createMap();

        return (
            <React.Fragment>
                <div className="main-canvas" ref="mainCanvas">
                    <svg
                        id={"svg"}
                        width={this.state.width}
                        height={this.state.height}
                    >
                        <g />
                        <g ref="circleGroup" />
                    </svg>
                    <canvas />
                </div>
                <TimeSlider
                    width={this.state.width}
                    height={this.props.height}
                    filterData={this.filterData}
                />
            </React.Fragment>
        );
    }
}
