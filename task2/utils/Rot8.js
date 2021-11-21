var fs = require('fs');
const {Transform} = require("stream");

class Decode extends Transform {
    constructor(options) {
        super(options);
    }
    
    _transform(chunk,encode,callback){
        //console.log("In rot8Encode: "+ chunk.toString())
        chunk = chunk.toString().charCodeAt(0)
        if(chunk > 64 && chunk < 91){
            chunk = (((chunk - 90) - 8) % 26) + 90; 
        } else if(chunk > 96 && chunk < 123){
            chunk = (((chunk - 122) - 8) % 26) + 122; 
        }
        chunk = String.fromCharCode(chunk)
        //console.log("Out rot8Encode: "+ chunk)
        chunk = Buffer.from(chunk)
        callback(null, chunk)
    }
}
class Encode extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk,encode,callback){
        //console.log("In rot8Decode: "+ chunk.toString())
        chunk = chunk.toString().charCodeAt(0)
        if(chunk > 64 && chunk < 91){
            chunk = (((chunk - 65) + 8) % 26) + 65; 
        } else if(chunk > 96 && chunk < 123){
            chunk = (((chunk - 97) + 8) % 26) + 97; 
        }
        chunk = String.fromCharCode(chunk)
        //console.log("Out rot8Decode: "+ chunk)
        chunk = Buffer.from(chunk)
        callback(null, chunk)
    }
}

module.exports = {
    Encode : Encode,
    Decode : Decode,
  }