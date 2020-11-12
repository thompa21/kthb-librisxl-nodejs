require('dotenv').config()
const axios = require("axios");

const API_URL = process.env.API_URL;

const deleteHolding = (id, type) => {
    //console.log(id + type)
    return axios({
        method: "DELETE",
        url : API_URL + 'librisholding/' + type + '/' + id,
        headers: {
            "Authorization": process.env.API_TOKEN
        }
    })
}

exports.deleteHolding = deleteHolding;

