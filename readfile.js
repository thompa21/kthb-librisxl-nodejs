const fs = require('fs'); 
const csv = require('csv-parser');
let results = [];

const getLibrisId = (inputFilePath) => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(inputFilePath)
            .pipe(csv({ separator: ';' }))
            .on('data', function(data){
                try {
                    //perform the operation
                    results.push(data);
                    //console.log(results)
                }
                catch(err) {
                    //error handler
                }
            })
            .on('end',function(){
                //console.log(results);
                resolve(results);
            }); 
            return results;
        });
    }

exports.getLibrisId = getLibrisId;