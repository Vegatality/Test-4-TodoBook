import axios from "axios";
import React from "react";

function CheckApi() {
    const getResponse = async () => {
        await axios.post("http://3.38.191.164/register", {});
    };

    return <div>{}</div>;
}

export default CheckApi;
