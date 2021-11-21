var get_args = require("../utils/argsval.js")

test("config, input, output passed correctly", () => {
    expect(get_args(['-c', 'C1-C1-R0-A', '-i', 'task1/test/argsval.test.js', '-o', 'task1/test/argsval.test.js'])).toEqual({
        config: 'C1-C1-R0-A',
        input: "task1/test/argsval.test.js",
        output: "task1/test/argsval.test.js",
        error: []
    });
})

test("config duplication detection", () => {
    expect(get_args(['--config', 'A', '-c', 'A'])).toEqual({
        config: false,
        input: false,
        output: false,
        error: ['Config duplication: -c A and -c A']
    });
})

test("input duplication detection", () => {
    expect(get_args(['--input', 'input.txt', '-i', 'input.txt'])).toEqual({
        config: false,
        input: false,
        output: false,
        error: [
            'No config found.',
            "Input file duplication: '-i input.txt' and '-i input.txt'"
        ]
    });
})

test("output duplication detection", () => {
    expect(get_args(['--output', 'output.txt', '-o', 'output.txt'])).toEqual({
        config: false,
        input: false,
        output: false,
        error: [
            'No config found.',
            "Output file duplication: '-o output.txt' and '-o output.txt'"
        ]
    });
})

test("wrong config passed", () => {
    expect(get_args(['--config', 'abs'])).toEqual({
        config: false,
        input: false,
        output: false,
        error: ["Incorrect config params: '-c abs'"]
    });
})

test("wrong input/output file paths passed", () => {
    expect(get_args(['-i', 'abs', '-o', "abs"])).toEqual({
        config: false,
        input: false,
        output: false,
        error: [
            'No config found.',
            "Input file doesn't exist: '-i abs'",
            "Output file doesn't exist: '-o abs'"
        ]
    });
})

test("undefined config catch", () => {
    expect(get_args(['-c', undefined])).toEqual({
        config: false,
        input: false,
        output: false,
        error: [
            "Incorrect config params: '-c undefined'"
        ]
    });
})