import { getVirusData } from "../../api-requests/data-request";
import * as d3 from "d3";
import * as L from "leaflet";
import "leaflet.heat";

const getData = async () => {
    return await getVirusData();
};

const createCircles = (heatlayer, map, data) => {
    let dataArray = [];

    heatlayer.setLatLngs([]);

    for (let d of data) {
        for (let i = 0; i < d.sumCases; i++) {
            dataArray.push(L.latLng(d.longitude, d.latitude));
        }
    }

    heatlayer.setLatLngs(dataArray);
};

export {
    createCircles as createVirusCircles,
    getData as getVirusData,
};
