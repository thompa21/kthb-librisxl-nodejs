const fs = require('fs'); 
const csv = require('csv-parser');
const results = [];

const getLibrisId = (inputFilePath) => {
    fs.createReadStream(inputFilePath)
        .pipe(csv({ separator: ';' }))
        .on('data', function(data){
            try {
                //perform the operation
                results.push(data);
                //console.log(data.LibrisNr)
            }
            catch(err) {
                //error handler
            }
        })
        .on('end',function(){
            //console.log(results);
        }); 
        return results;
    }

exports.getLibrisId = getLibrisId;