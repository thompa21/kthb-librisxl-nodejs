

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

    const librisids = await readcsv.getLibrisId("./data/librisid1.csv");
    console.log(librisids)
    let response4;

    const getLibrisUri = async _ => {
        let currentid;
        console.log('Script started!')
        let max = 6;
        for (let index = 0; index < librisids.length; index++) {
            if (index >= max) {
                break;
            }
            console.log(librisids[index])
            
            librisidarr = librisids[index].librisid.split(';')
            
            for (let k = 0; k < librisidarr.length; k++) {
                if(librisidarr[k] != '') {
                    if(librisidarr[k].indexOf('(LIBRIS)') !== -1 ) {
                        //sök på librismärkt id i första hand
                        currentid = librisidarr[k].substr(8, librisidarr[k].length)
                        response4 = await libris.findHoldinguri(librisidarr[k].substr(8, librisidarr[k].length),'bibid')
                        if(response4.data.totalItems > 0){
                            break;
                        }
                    } else {
                        currentid = librisidarr[k]
                        response4 = await libris.findHoldinguri(librisidarr[k],'libris3')
                    }
                }
            }
            
           
            if(response4.data.totalItems > 0){
                for (let j = 0; j < response4.data.items[0]['@reverse'].itemOf.length; j++) {
                    if(response4.data.items[0]['@reverse'].itemOf[j].heldBy['@id'] == 'https://libris.kb.se/library/T'){
                        
                        console.log(response4.data.items[0]['@reverse'].itemOf[j]['@id'])
                        const response2 = await libris.getEtag(response4.data.items[0]['@reverse'].itemOf[j]['@id'])
                        etag = response2.headers.etag
                        console.log(response2.headers.etag)
                        json_payload = JSON.stringify(response2.data)
                        console.log(response2.data)
                        
                        //const response3 = await libris.updateHolding(response4.data.items[0]['@reverse'].itemOf[j]['@id'], etag, access_token, json_payload)
                        //console.log(response3.data)
                        const response5 = await libris.deleteHolding(response4.data.items[0]['@reverse'].itemOf[j]['@id'], etag, access_token)
                        console.log(response5.data)
                        
                    }
                }
            } else {
                console.log('No holding found!!! id:' + currentid)
            }
            
        }
        console.log('Script finished!')
    }
    
    getLibrisUri();
    
}
asyncApiCall()