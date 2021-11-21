var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stderr); });
};


test('case 1', done => {
    var dir = __dirname.split("\\")
    dir.pop()
    dir = dir.join("/")
    execute("node "+dir+"/my_ciphering_cli -c C1-C1-A-R0 -c A", (stderr)=>{
        expect(stderr).toBe("Config duplication: -c C1-C1-A-R0 and -c A");
        done();
    })
})

test('case 2', done => {
    var dir = __dirname.split("\\")
    dir.pop()
    dir = dir.join("/")
    execute("node "+dir+"/my_ciphering_cli", (stderr)=>{
        expect(stderr).toBe("No config found.");
        done();
    })
})

test('case 3', done => {
    var dir = __dirname.split("\\")
    dir.pop()
    dir = dir.join("/")
    execute("node "+dir+"/my_ciphering_cli -c A -i "+dir+"/non_input.txt", (stderr)=>{
        expect(stderr).toBe("Input file doesn't exist: '-i C:/RSSchool/task2/non_input.txt'");
        done();
    })
})

test('case 4', done => {
    var dir = __dirname.split("\\")
    dir.pop()
    dir = dir.join("/")
    execute("node "+dir+"/my_ciphering_cli -c A -o "+dir+"/non_output.txt", (stderr)=>{
        expect(stderr).toBe("Output file doesn't exist: '-o C:/RSSchool/task2/non_output.txt'");
        done();
    })
})

test('case 5', done => {
    execute("node task2/my_ciphering_cli -c ABC", (stderr)=>{
        expect(stderr).toBe("Incorrect config params: '-c ABC'");
        done();
    })
})


// test('case 6', done => {             // test case 6 is implemented in argsval.test.js
//     var dir = __dirname.split("\\")
//     dir.pop()
//     dir = dir.join("/")
//     execute("node "+dir+`/my_ciphering_cli -c C1-C1-R0-A & This is secret. Message about "_" symbol!`, (stderr)=>{
//         console.log(stderr)
//         expect(stderr).toBe("Incorrect config params: '-c ABC'");
//         done();
//     })
// })



test("case7", ()=>{
    var spawn = require('child_process').spawn
    var child = spawn("node" ,[`${__dirname}/../my_ciphering_cli`, "-c", "C1-C1-R0-A"]);
    var source = 'This is secret. Message about "_" symbol!';
    child.stdin.write(source);
    var result = [];
    var goal = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';
    var index = 0;
    return new Promise((resolve)=>{
        child.stdout.on("data", (data) => {
            index+=data.toString().length
            result.push(data.toString())
            if(source.length === index){
                child.kill("SIGINT");
                expect(result.join("")).toBe(goal);
                resolve();
            }
        })
    })


})