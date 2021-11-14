var fs = require('fs');
const {Transform} = require("stream");

module.exports = class StdinTransformStream extends Transform {
    constructor(options) {
        super(options);
    }
    _transform(chunkArr,encode,callback){
        chunkArr = chunkArr.toString()
        // console.log("StdinTransformStream: " + chunkArr)
        // console.log("StdinTransformStream len: " + chunkArr.length)
        for (let i = 0; i < chunkArr.length; i++) {
            var chunk = chunkArr[i];
            chunk = Buffer.from(chunk)
            this.push(chunk)
        }
    }
}
