

const libris = require('./libris')
const readcsv = require('./readfile')
var access_token;
var etag;
var id = '15bfjcr659dmlpd';
id = 'tz4rp1z023mfg4k'
var json_payload;

var librisids = [];

const asyncApiCall = async () => {
    const response = await libris.getToken()
    access_token = response.data.access_token
    console.log(response.data.access_token)
    
    const response2 = await libris.getEtag(id)
    etag = response2.headers.etag
    console.log(response2.headers.etag)
    json_payload = JSON.stringify(response2.data)
    console.log(response2.data)
    const response3 = await libris.updateHolding(id, etag, access_token, json_payload)
    console.log(response3.data)

    const librisids = await readcsv.getLibrisId("./data/LibrisID.csv");

    librisids.forEach( async element => {
        if(element.Libris_ID.indexOf('(LIBRIS)') != -1) {
            console.log('onr')
            console.log(element.Libris_ID)
        } else {
            const response4 = await libris.findHoldinguri(element.Libris_ID)
            console.log(response4.data)
        }
        //console.log(element.Libris_ID);
    });
    
}
asyncApiCall()