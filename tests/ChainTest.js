/**
 * Created by OTymchenko on 09.12.14.
 */


describe("Chain Suite", function() {

    var chain;

    beforeEach(function() {
        chain = new Chain();
    });

    it("test .then", function() {

        var _data = "some data";

        chain.then(function(data) {
            expect(_data).toBe(data);
        });

        chain.resolve(_data);
    });

    it("test .filter", function() {

        chain.filter(function(data) {
            return data;
        }).then(function(data){
            expect(data).toBeTruthy();
        });

        chain.resolve(true);
        chain.resolve(false);
    });

    it("test .execute", function(){

        this.testFunc = function() {}
        chain.execute();

        spyOn(this, "testFunc").and.callThrough();

        chain.resolve(this.testFunc);

        expect(this.testFunc).toHaveBeenCalled();

    });

});


