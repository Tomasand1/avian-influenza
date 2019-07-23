import axios from "axios";

class GetRequest {
    constructor(host, version, request) {
        this.version = version;
        this.host = host;
        this.request = request;
    }

    init = async () => {
        try {
            const data = await axios.get(
                `${this.host}/${this.version}/${this.request}`,
            );

            if (!data) {
                throw new Error("No data found");
            }

            return data;
        } catch (err) {
            // TODO: manage errors
            console.log(err);
        }
    };
}

export default GetRequest;
