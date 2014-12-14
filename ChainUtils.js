/**
 * Created by ader on 12/14/14.
 */

this.ChainUtils = function() {


};

//TODO Doesn't work with filters like chains and async chains

this.ChainUtils.getStream = function(chain) {

    var last;
    var nextChain = chain;

    var stream = [chain];

    do  {
        nextChain = nextChain.getNext();
        if (nextChain) {
            last = nextChain;
            stream.push(last);
        }
    } while(nextChain);

    return stream;

}

this.ChainUtils.getLastChain = function(chain) {

    var stream = ChainUtils.getStream(chain);
    if (stream.length > 1) {
        return stream.pop();
    }

    return null;

}

this.ChainUtils.getStreamSize = function(chain) {

    var stream = ChainUtils.getStream(chain);
    return stream.length;


}
