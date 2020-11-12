

const libris = require('./api')
const readcsv = require('./readfile')
var access_token;
var etag;
var id = '15bfjcr659dmlpd';
id = 'tz4rp1z023mfg4k'
var json_payload;

var librisids = [];

const asyncApiCall = async () => {

    const librisids = await readcsv.getLibrisId("./data/librisid1.csv");
    console.log(librisids)
    let holdinguri;

    const getLibrisUri = async () => {
        let currentid;
        let librisidtype;
        console.log('Script started!')
        console.log("Antal poster som ska tas bort: " + librisids.length)
        let numberofdeleted = 0;
        let max = 4;
        for (let index = 0; index < librisids.length; index++) {
            if (index >= max) {
                break;
            }
            //console.log(librisids[index])
            
            librisidarr = librisids[index].librisid.split(';')
            let currentid = "";
            //console.log(librisidarr.length)

            for (let k = 0; k < librisidarr.length; k++) {
                
                if(librisidarr[k] != '') {
                    if(librisidarr[k].indexOf('(LIBRIS)') !== -1 ) {
                        //sök på librismärkt id i första hand
                        //console.log('librisidarr bib: '+ librisidarr[k])
                        currentid = librisidarr[k].substr(8, librisidarr[k].length)
                        librisidtype = 'bibid'
                        break;
                    }
                }
            }

            //Inget bibid hittades
            if (currentid == "") {
                //Finns ett värde som saknar "("? Då anses det vara ett "libris3" id
                for (let k = 0; k < librisidarr.length; k++) {
                    if(librisidarr[k].indexOf('(') === -1 ) {
                        //console.log('librisidarr 3: '+ librisidarr[k])
                        currentid = librisidarr[k]
                        librisidtype = 'libris3'
                        break;
                    }	
                }
            }

            //Anropa delete API
            if (currentid != "") {
                //console.log('deleteholding')
                const deleteholding = await libris.deleteHolding(currentid, librisidtype)
                if (deleteholding.data.holding == 'Deleted') {
                    numberofdeleted++
                } else {
                    console.log(deleteholding.data)
                }
                //console.log(deleteholding.data)
            }
        }
        console.log('Antal borttagna poster: ' + numberofdeleted)
        console.log('Script finished!')
    }
    
    getLibrisUri();
    
}
asyncApiCall()