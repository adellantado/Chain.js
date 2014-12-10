/**
 * Created by OTymchenko on 09.12.14.
 */


describe("Chain Suite", function() {

    var chain;

    beforeEach(function() {
        chain = new Chain();
    });



    it("test .map", function() {

        var _data = "some data";

        chain.map(function(data) {
            expect(_data).toBe(data);
        });

        chain.resolve(_data);
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
        spyOn(this, "testFunc").and.callThrough();

        chain.execute();

        chain.resolve(this.testFunc);

        expect(this.testFunc).toHaveBeenCalled();

    });

    it("test .carry", function(){

        var arg = true;

        this.twoArgsFunc = function(arg1, arg2) {
            expect(arg1).not.toBeUndefined();
            expect(arg2).not.toBeUndefined();
        }
        spyOn(this, "twoArgsFunc").and.callThrough();

        chain.carry(this.twoArgsFunc).execute(arg);

        chain.resolve(arg);

        expect(this.twoArgsFunc).toHaveBeenCalled();

    });

    it("test .compose", function(){

        this.functionInner = function(data) {
            return data+1;
        }
        spyOn(this, "functionInner").and.callThrough();

        this.functionOuter = function(data) {
            expect(2).toEqual(data);
        }
        spyOn(this, "functionOuter").and.callThrough();

        chain.compose(this.functionOuter, this.functionInner);

        chain.resolve(1);

        expect(this.functionInner).toHaveBeenCalled();
        expect(this.functionOuter).toHaveBeenCalled();


    });

});


