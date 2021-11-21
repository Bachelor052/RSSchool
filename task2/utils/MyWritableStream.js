var fs = require('fs');
const {Writable} = require("stream");

module.exports = class MyWritableStream extends Writable {
    constructor(filename, chunk_size) {
        super();
        this.filename = filename;
        this.fd = 0
        //this.chunk_size = chunk_size
    }
    _construct(callback) {
        fs.open(this.filename, "a+", (err, fd) => {
            this.fd = fd;
            callback();
        });
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }
    _destroy(err, callback) {
        fs.close(this.fd, (er) => callback(er || err));
    }
}