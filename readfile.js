const fs = require('fs'); 
const csv = require('csv-parser');
let results = [];

const getLibrisId = (inputFilePath) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(inputFilePath)
            .pipe(csv({ separator: '' }))
            .on('data', function(data){
                try {
                    results.push(data);
                }
                catch(err) {
                    //TODO felhantering
                }
            })
            .on('end',function(){
                resolve(results);
            }); 
            return results;
        });
    }

exports.getLibrisId = getLibrisId;