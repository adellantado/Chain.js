/**
 * Created by ader on 12/14/14.
 */

describe("ChainUtils Suite", function() {

    var chain;

    beforeEach(function() {
        chain = new Chain();
    })

    it(".getStream", function(){

        var stream = ChainUtils.getStream(chain);
        expect(stream).not.toBeNull();
        expect(stream.length).toBe(1);

        var f = function(){};
        chain.map(f).map(f);

        stream = ChainUtils.getStream(chain);

        expect(stream).not.toBeNull();
        expect(stream.length).toBe(3);

    });

    it(".getLastChain", function(){

        expect(ChainUtils.getLastChain(chain)).toBeNull();

        var f = function(){};
        var last = chain.map(f).map(f);

        var lastChain = ChainUtils.getLastChain(chain);

        expect(last).toEqual(lastChain);

    });

    it(".getStreamSize", function(){

        var size = ChainUtils.getStreamSize(chain);
        expect(size).toBe(1);

        var f = function(){};
        chain.map(f).map(f);

        size = ChainUtils.getStreamSize(chain);

        expect(size).toBe(3);

    });

});