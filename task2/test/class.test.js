
var StdinTransformStream = require("../utils/StdinTransformStream.js");
var MyReadableStream = require("../utils/MyReadableStream.js")
var MyWritableStream = require("../utils/MyWritableStream.js");
var CaesarEncode = require("../utils/Caesar.js").Encode;
var CaesarDecode = require("../utils/Caesar.js").Decode;
var Rot8Encode = require("../utils/Rot8.js").Encode;
var Rot8Decode = require("../utils/Rot8.js").Decode;
var Atbash = require("../utils/Atbash.js");
const {pipeline} = require("stream");
const fs = require('fs')



function caesarDecodeFunc(char, callback){
    var caesarDecode = new CaesarDecode()
    caesarDecode._transform(Buffer.from(char),"utf-8",(dump, transData)=>{
        callback(transData)
    })
}
function caesarEncodeFunc(char, callback){
    var caesarEncode = new CaesarEncode()
    caesarEncode._transform(Buffer.from(char),"utf-8",(dump, transData)=>{
        callback(transData)
    })
}

function rot8DecodeFunc(char, callback){
    var rot8Decode = new Rot8Decode()
    rot8Decode._transform(Buffer.from(char),"utf-8",(dump, transData)=>{
        callback(transData)
    })
}
function rot8EncodeFunc(char, callback){
    var rot8Encode = new Rot8Encode()
    rot8Encode._transform(Buffer.from(char),"utf-8",(dump, transData)=>{
        callback(transData)
    })
}
function atbashFunc(char, callback){
    var atbash = new Atbash()
    atbash._transform(Buffer.from(char),"utf-8",(dump, transData)=>{
        callback(transData)
    })
}

function stdinTransformStreamFunc(char, callback){
    var stdinTransformStream = new StdinTransformStream()
    stdinTransformStream._transform(Buffer.from(char),"utf-8",(transData)=>{
        callback(transData)
    })
}

function myReadableStreamFunc(callback){
    var wrongReadStream = new MyReadableStream("task2/test/wrong_input_test.txt", 1);
    var readStream = new MyReadableStream("task2/test/input_test.txt", 1);
    readStream._construct((data) => {})
    var source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
    var result = [];
    var index = 0;

    readStream.on("data", (data)=>{
        index+=data.toString().length
        result.push(data.toString())
        if(source.length === index){
            callback(result.join(""))
            
        }
    })
}

function myWritableStreamFunc(callback){
    var wrongWriteStream = new MyWritableStream("task2/test/wrong_output_test.txt");
    var writeStream = new MyWritableStream("task2/test/output_test.txt");
    writeStream._construct((data) => {})
    var source = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
    fs.writeFile("task2/test/output_test.txt", '', ()=>{
        writeStream._write(source, "utf-8", ()=>{
            fs.readFile("task2/test/output_test.txt", "utf8", function(error,data){
                callback(data)
            });
        })
    })
    
}

test("MyWritableStream test read file", () => {
    var goal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
    myWritableStreamFunc((result)=>{
        expect(result).toBe(goal);
    })
})


test("MyReadableStream test read file", () => {
    var goal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz';
    myReadableStreamFunc((result)=>{
        expect(result).toBe(goal);  
    })
})

test('CaesarDecode test', () => {
    var result = [];
    var source = 'AbC'.split("");
    var goal = 'ZaB';
    var index = 0;

    source.forEach(char => {
        caesarDecodeFunc(char,(transData)=>{
            index+=transData.toString().length
            result.push(transData.toString())
            if(source.length == index){
                result = result.join("");
                expect(result).toBe(goal);
            }
        })
    });
});

test('CaesarEncode test', () => {
    var result = [];
    var source = 'AbC'.split("");
    var goal = 'BcD';
    var index = 0;

    source.forEach(char => {
        caesarEncodeFunc(char,(transData)=>{
            index+=transData.toString().length
            result.push(transData.toString())
            if(source.length == index){
                result = result.join("");
                expect(result).toBe(goal);
            }
        })
    });
});

test('Rot8Decode test', () => {
var result = [];
var source = 'AbC'.split("");
var goal = 'StU';
var index = 0;

source.forEach(char => {
    rot8DecodeFunc(char,(transData)=>{
        index+=transData.toString().length
        result.push(transData.toString())
        if(source.length == index){
            result = result.join("");
            expect(result).toBe(goal);
        }
    })
});
});

test('Rot8Encode test', () => {
    var result = [];
    var source = 'AbC'.split("");
    var goal = 'IjK';
    var index = 0;

    source.forEach(char => {
        rot8EncodeFunc(char,(transData)=>{
            index+=transData.toString().length
            result.push(transData.toString())
            if(source.length == index){
                result = result.join("");
                expect(result).toBe(goal);
            }
        })
    });
});

test('Atbash test', () => {
    var result = [];
    var source = 'Az'.split("");
    var goal = 'Za';
    var index = 0;

    source.forEach(char => {
        atbashFunc(char,(transData)=>{
            index+=transData.toString().length
            result.push(transData.toString())
            if(source.length == index){
                result = result.join("");
                expect(result).toBe(goal);
            }
        })
    });
});

test('StdinTransformStream test', () => {
    var result = [];
    var source = 'Az'.split("");
    var goal = 'Az';
    var index = 0;

    source.forEach(char => {
        stdinTransformStreamFunc(char,(transData)=>{
            index+=transData.toString().length
            result.push(transData.toString())
            if(source.length == index){
                result = result.join("");
                expect(result).toBe(goal);
            }
        })
    });
});