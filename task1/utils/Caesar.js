var fs = require('fs');
const {Transform} = require("stream");

class Encode extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk,encode,callback){
        //console.log("In caesarEncode: "+ chunk.toString())
        chunk = chunk.toString().charCodeAt(0)
        if(chunk > 64 && chunk < 91){
            chunk = (((chunk - 90) - 1) % 26) + 90; 
        } else if(chunk > 96 && chunk < 123){
            chunk = (((chunk - 122) - 1) % 26) + 122; 
        }
        chunk = String.fromCharCode(chunk)
        //console.log("Out caesarEncode: "+ chunk)
        chunk = Buffer.from(chunk)
        callback(null, chunk)
    }
}
class Decode extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunk,encode,callback){
        //console.log("In caesarDecode: "+ chunk.toString())
        chunk = chunk.toString().charCodeAt(0)
        if(chunk > 64 && chunk < 91){
            chunk = (((chunk - 65) + 1) % 26) + 65; 
        } else if(chunk > 96 && chunk < 123){
            chunk = (((chunk - 97) + 1) % 26) + 97; 
        }
        chunk = String.fromCharCode(chunk)
        //console.log("Out caesarDecode: "+ chunk)
        chunk = Buffer.from(chunk)
        callback(null, chunk)
    }
}

module.exports = {
    Encode : Encode,
    Decode : Decode,
  }