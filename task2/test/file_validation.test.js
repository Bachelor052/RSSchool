var fv = require("../utils/file_validation.js")

test("file_validation test", () => {
    expect(fv.file_valid("task2/test/file_validation.test.js")).toBeTruthy();
})