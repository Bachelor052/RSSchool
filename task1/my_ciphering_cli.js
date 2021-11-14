var StdinTransformStream = require("./utils/StdinTransformStream.js");
var MyReadableStream = require("./utils/MyReadableStream.js")
var MyWritableStream = require("./utils/MyWritableStream.js");
var CaesarEncode = require("./utils/Caesar.js").Encode;
var CaesarDecode = require("./utils/Caesar.js").Decode;
var Rot8Encode = require("./utils/Rot8.js").Encode;
var Rot8Decode = require("./utils/Rot8.js").Decode;
var Atbash = require("./utils/Atbash.js");
const { pipeline } = require("stream");
var get_args = require("./utils/argsval.js")

var stdinTransformStream = new StdinTransformStream();
var validation = get_args(process.argv);

if (validation.error.length != 0) {
    process.stderr.write("\x1b[41m" + validation.error.join("\n") + "\x1b[0m")
    process.exit(-1)
} else {
    var {config, input, output} = validation
    var configArr =  config.split("-")
    const pipes = []

    if(input) {
        var readStream = new MyReadableStream(input, 1);
        pipes.push(readStream)
    } else {
        var readStream = process.stdin
        process.stdin.on('data', (data)=>{
            chunkArr = data.toString()
            for (let i = 0; i < chunkArr.length; i++) {
                var chunk = chunkArr[i];
                chunk = Buffer.from(chunk)
                stdinTransformStream.push(chunk)
            }
        })
        pipes.push(stdinTransformStream)
    }
    if(output){
        var writeStream = new MyWritableStream(output);
    } else {
        var writeStream = process.stdout
    }
       
    configArr.forEach(element => {
        switch(element){
            case "C0":
                pipes.push(new CaesarEncode())
            break;
            case "C1": 
                pipes.push(new CaesarDecode())
            break;
            case "A": 
                pipes.push(new Atbash())
            break;
            case "R0": 
                pipes.push(new Rot8Encode())
            break;
            case "R1": 
                pipes.push(new Rot8Decode())
            break;
        }
    });
    pipeline(
        ...pipes,
        writeStream,
        (err)=>{
            if(err != undefined){
                console.log(err)
            } else {
                process.stdout.write("Done!")
            }
        }
    );
    readStream.on('close', ()=>{
        writeStream.end();
    })
}
