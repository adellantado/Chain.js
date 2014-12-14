/**
 * Created by ader on 12/14/14.
 */

describe("ChainDebug Suite", function() {

    var debug;

    beforeEach(function() {
        debug = new ChainDebug();
    })

    it("log resolve test", function(){

        var chain = new Chain();
        var f = function(data){return data+1};
        chain.map(f).map(f).map(function(data){
            expect(data).toBe(3);
        });

        debug.addChain(chain);

        chain.resolve(1);


    });

});
