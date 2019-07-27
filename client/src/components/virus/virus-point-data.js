import { getVirusData } from "../../api-requests/data-request";
import * as d3 from "d3";

const size = d3
    .scaleLinear()
    .domain([1, 150000]) // What's in the data
    .range([0.1, 0.3]); // Size in pixel

const getData = async () => {
    return await getVirusData();
};

const updateCircles = (projection, scale) => {
    let geoProjection = projection;
    d3.selectAll(".virus-circle")
        .attr("cx", function(d) {
            return geoProjection([d.latitude, d.longitude])[0];
        })
        .attr("cy", function(d) {
            return geoProjection([d.latitude, d.longitude])[1];
        })
        .attr("r", function(d) {
            return 2 * scale;
        });

    //TODO: make clusers smaller when zoomed out
};

const createCircles = (projection, refs, data) => {
    var color = d3
        .scaleOrdinal()
        .domain(["HPAI", "LPAI", "other"])
        .range(["red", "blue", "green"]);

    let svg = d3.select(refs.circleGroup);

    let geoProjection = projection;

    let circles = svg.selectAll(".virus-circle").data(data);

    circles.exit().remove();

    circles
        .enter()
        .append("circle")
        .attr("class", "virus-circle")
        .attr("cx", function(d) {
            return geoProjection([d.latitude, d.longitude])[0];
        })
        .attr("cy", function(d) {
            return geoProjection([d.latitude, d.longitude])[1];
        })
        .attr("r", function(d) {
            return 2;
        })
        .style("fill", function(d) {
            return color(
                d.serotype
                    ? d.serotype.indexOf("HPAI") > -1
                        ? "HPAI"
                        : "LPAI"
                    : "other",
            );
        })
        .attr("stroke", function(d) {
            return color(
                d.serotype
                    ? d.serotype.indexOf("HPAI") > -1
                        ? "HPAI"
                        : "LPAI"
                    : "other",
            );
        })
        .attr("stroke-width", 1)
        .attr("fill-opacity", d => size(d.sumAtRisk));
};

export {
    createCircles as createVirusCircles,
    getData as getVirusData,
    updateCircles as updateVirusCircles,
};
