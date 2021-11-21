var fv = require("../utils/file_validation.js")

test("file_validation test", () => {
    expect(fv.file_valid("task1/test/file_validation.test.js")).toBeTruthy();
})