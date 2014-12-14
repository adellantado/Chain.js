/**
 * Created by ader on 12/14/14.
 */

this.ChainDebug = function() {

    var addedChains = [];
    var streams = {};

    this.addChain = function(chain, streamName) {
        addedChains.push(chain);

        var stream = ChainUtils.getStream(chain);


        streams[streamName || getRandStreamName()] = stream;

        var nextChain;
        for (var i = 0; i < stream.length; i++) {
            nextChain = stream[i];

            var resolve = nextChain.resolve;
            nextChain.resolve = resolveFunc;
            nextChain.resolve0 = resolve;
        }
    }

    var resolveFunc = function(data) {
        var nextChain = this;
        logResolve(nextChain);
        nextChain.resolve0.call(nextChain, data);
    }

    var logResolve = function(chain) {
        console.log("Chain resolved");
    }


    function getRandStreamName() {
        return "[" + Math.random().toString(36).substring(7) + "]";
    }

}