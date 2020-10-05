require('dotenv').config()
const axios = require("axios");


const client_id=process.env.CLIENT_ID
const client_secret=process.env.CLIENT_SECRET
const grant_type=process.env.GRANT_TYPE


const AUTH_URL = process.env.AUTH_URL

const API_URL = process.env.API_URL;


   const getToken = () => axios({
        method:"POST",
        url : AUTH_URL + `?client_id=` + client_id + `&client_secret=` + client_secret + `&grant_type=` + grant_type,
        headers: {
            "content-type":"application/x-www-form-urlencoded",
        },
        
        params: {
            x: 's'
        }
        
    })

    const getEtag = (id) => axios({
        method:"GET",
        url : API_URL + id,
        headers: {
            "content-type":"application/json",
            "Accept":"application/ld+json"
        },
        
        params: {
            x: 's'
        }
        
    })

    //_findhold?id=http://libris.kb.se/bib/6747122&library=https://libris.kb.se/library/T

    const updateHolding = (id, etag, token, json_payload) => axios({
        method:"PUT",
        url : API_URL + id,
        headers: {
            "content-type":"application/ld+json",
            "XL-Active-Sigel":"T",
            "If-Match": etag,
            "Authorization":"Bearer " + token
        },
        
        data: json_payload
        
    })

    const findHoldinguri = (id) => axios({
        method:"GET",
        url : API_URL + '_findhold?id=http://libris.kb.se/bib/' + id + '&library=https://libris.kb.se/library/T',
        headers: {
            "content-type":"application/json"
        },
        
        data: ''
    })

    exports.getToken = getToken;

    exports.getEtag = getEtag;

    exports.updateHolding = updateHolding;

    exports.findHoldinguri = findHoldinguri;
