/**
 * Created by OTymchenko on 09.12.14.
 */


var inter = getJasmineRequireObj().interface();

inter.describe("A suite", function() {
    inter.it("contains spec with an expectation", function() {
        inter.expect(true).toBe(true);
    });
});


