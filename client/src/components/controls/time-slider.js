import React, { Component } from "react";
import * as d3 from "d3";

export default class TimeSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date("2010-01-01"),
            endDate: new Date("2019-12-30"),
            moving: false,
            currentValue: 0,
            targetValue: this.props.width,
            width: this.props.width,
            height: 50,
        };
    }

    componentDidMount() {
        this.createSlider();
    }

    componentDidUpdate() {}

    createSlider = () => {
        const formatDateIntoYear = d3.timeFormat("%Y");
        const formatDate = d3.timeFormat("%b %Y");
        const parseDate = d3.timeParse("%m/%d/%y");

        const svg = d3
            .select("#vis")
            .append("svg")
            .attr("width", this.state.width)
            .attr("height", this.state.height);

        this.playButton = d3.select("#play-button");

        this.xDomain = d3
            .scaleTime()
            .domain([this.state.startDate, this.state.endDate])
            .range([0, this.props.width - 100])
            .clamp(true);

        const slider = svg
            .append("g")
            .attr("class", "slider")
            .attr(
                "transform",
                "translate(" + 50 + "," + this.state.height / 5 + ")",
            );

        slider
            .append("line")
            .attr("class", "track")
            .attr("x1", this.xDomain.range()[0])
            .attr("x2", this.xDomain.range()[1])
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-inset")
            .select(function() {
                return this.parentNode.appendChild(this.cloneNode(true));
            })
            .attr("class", "track-overlay")
            .call(
                d3
                    .drag()
                    .on("start.interrupt", function() {
                        slider.interrupt();
                    })
                    .on("start drag", () => {
                        this.setState({
                            currentValue: d3.event.x,
                        });
                        this.update(
                            this.xDomain.invert(this.state.currentValue),
                        );
                    }),
            );

        slider
            .insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", "translate(0," + 18 + ")")
            .selectAll("text")
            .data(this.xDomain.ticks(10))
            .enter()
            .append("text")
            .attr("x", this.xDomain)
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text(function(d) {
                return formatDateIntoYear(d);
            });

        this.playButton.on("click", () => {
            const button = d3.select("#play-button");
            if (button.text() === "Pause") {
                this.setState({
                    moving: false,
                });

                clearInterval(this.timer);
                // timer = 0;
                button.text("Play");
            } else {
                this.setState({
                    moving: true,
                });
                this.timer = setInterval(this.step, 700);
                button.text("Pause");
            }
            console.log("Slider moving: " + this.state.moving);
        });

        this.handle = slider
            .insert("circle", ".track-overlay")
            .attr("class", "handle")
            .attr("r", 9);

        this.label = slider
            .append("text")
            .attr("class", "label")
            .attr("text-anchor", "middle")
            .text(formatDate(this.state.startDate))
            .attr("transform", "translate(0," + -25 + ")");
    };

    step = () => {
        this.update(this.xDomain.invert(this.state.currentValue));
        this.setState({
            currentValue:
                this.state.currentValue + this.state.targetValue / 522,
        });
        console.log(this.xDomain.invert(this.state.currentValue));
        if (this.state.currentValue > this.state.targetValue) {
            this.setState({
                moving: false,
                currentValue: 0,
            });
            clearInterval(this.timer);
            // timer = 0;
            this.playButton.text("Play");
            console.log("Slider moving: " + this.state.moving);
        }
    };

    update = h => {
        const formatDate = d3.timeFormat("%b %Y");

        // update position and text of label according to slider scale
        this.handle.attr("cx", this.xDomain(h));
        this.label.attr("x", this.xDomain(h)).text(formatDate(h));

        // filter data set and redraw plot
        this.props.filterData(h);
        // var newData = this.dataset.filter(function(d) {
        //   return d.date < h;
        // })
        // Redraw circles
    };

    render() {
        return (
            <div id="vis">
                <button id="play-button">Play</button>
            </div>
        );
    }
}
