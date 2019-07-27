import get from "./base/get-request";

const getVirusData = async query => {
    let newRequest = {};
    if (query) {
        newRequest = new get(
            "http://localhost:8080",
            "v1",
            `virus/data?${query}`,
        );
    } else {
        newRequest = new get("http://localhost:8080", "v1", `virus/data`);
    }

    const request = await newRequest.init();

    return request.data;
};

const getBirdData = async query => {
    let newRequest = {};
    if (query) {
        newRequest = new get(
            "http://localhost:8080",
            "v1",
            `bird/data?${query}`,
        );
    } else {
        newRequest = new get("http://localhost:8080", "v1", `bird/data`);
    }

    const request = await newRequest.init();

    return request.data;
};

export { getVirusData, getBirdData };
