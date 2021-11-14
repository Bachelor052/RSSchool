var fs = require('fs');
const {Transform} = require("stream");

module.exports = class Atbash extends Transform {
    constructor(options) {
        super(options);
    }
  
    _transform(chunk,encode,callback){
        // console.log("In Atbash: "+ chunk.toString())
        chunk = chunk.toString().charCodeAt(0)
        //A-Z 65-90
        //a-z 97-122
        if(chunk > 64 && chunk < 91){
            chunk = 90 - (chunk-65)
        } else if(chunk > 96 && chunk < 123){
            chunk = 122 - (chunk-97)
        }
        chunk = String.fromCharCode(chunk)
        // console.log("Out Atbash: "+ chunk)
        chunk = Buffer.from(chunk)
        callback(null, chunk)
    }
}
