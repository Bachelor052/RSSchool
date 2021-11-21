var fs = require('fs');
const {Readable} = require("stream");

module.exports = class MyReadableStream extends Readable {
    constructor(filename, chunk_size) {
        super();
        this.filename = filename;
        this.fd = null;
        this.chunk_size = chunk_size
    }
    _construct(callback) {
        fs.open(this.filename, "r", (err, fd) => {
            this.fd = fd;
            callback();
        });
    }
    _read() {
        var chunk_size = this.chunk_size
        const buf = Buffer.alloc(chunk_size);
        fs.read(this.fd, buf, 0, chunk_size, null, (err, bytesRead) => {
            this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
        });
    }
    _destroy(err, callback) {
        fs.close(this.fd, (er) => callback(er || err));
    }
}

