import { getBirdData } from "../../api-requests/data-request";
import * as d3 from "d3";

const getData = async () => {
    return await getBirdData();
};

const createCircles = (projection, refs, data) => {
    let svg = d3.select(refs.circleGroup);

    let geoProjection = projection;

    let circles = svg.selectAll(".bird-circle").data(data);

    circles.exit().remove();

    circles
        .enter()
        .append("circle")
        .attr("class", "bird-circle")
        .attr("cx", function(d) {
            return geoProjection([d.longitude, d.latitude])[0];
        })
        .attr("cy", function(d) {
            return geoProjection([d.longitude, d.latitude])[1];
        })
        .attr("r", 2)
        .style("fill", function(d) {
            return "black";
        })
        .attr("stroke", function(d) {
            return "black";
        })
        .attr("stroke-width", 1)
        .attr("fill-opacity", 1);
};

const updateCircles = (projection, scale) => {
    let geoProjection = projection;
    d3.selectAll(".bird-circle")
        .attr("cx", function(d) {
            return geoProjection([d.longitude, d.latitude])[0];
        })
        .attr("cy", function(d) {
            return geoProjection([d.longitude, d.latitude])[1];
        });

    //TODO: make clusers smaller when zoomed out
};

export {
    getData as getBirdData,
    createCircles as createBirdCircles,
    updateCircles as updateBirdCircles,
};
