var fs = require('fs');
const {Writable} = require("stream");

module.exports = class MyWritableStream extends Writable {
    constructor(filename, chunk_size) {
        super();
        this.filename = filename;
        //this.chunk_size = chunk_size
    }
    _construct(callback) {
        fs.open(this.filename, "a+", (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}