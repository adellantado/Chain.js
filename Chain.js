/**
 * Created by ader on 11/25/14.
 */

this.Chain = function(func) {

    var self = this;

    var resolveFunc;
    var rejectFunc;

    var next;

    var resolved;

    this.setNext = function(chain) {
        return next = chain;
    }

    this.resolve = function(data) {
        var res;
        if (resolveFunc) {
            res = resolveFunc(data);

            resolved = true;

            if (res instanceof Chain) {
                res.setNext(next);
                next = null;
            }

        }
        if (next)
            next.resolve(res);

        return self;
    }

    this.reject = function(data) {
        var res;
        if (rejectFunc) {
            res = rejectFunc(data);
            resolved = false;
        }
        if (next)
            next.reject(res);

        return self;
    }

    function runFunc() {
        func(self.resolve, self.reject);
    }

    if (func)
        runFunc();

    this.resolved = function() {
        return resolved;
    }

    this.rejected = function() {
        return !resolved;
    }

    this.then = function(resolve, reject) {

        resolveFunc = resolve;
        rejectFunc = reject;

        return next = new Chain();

    }

    this.catch = function(reject) {
        rejectFunc = reject;

        return next = new Chain();
    }

    this.map = function(map) {
        resolveFunc = map;

        return next = new Chain();

    }

    this.compose = function(outer, inner) {

        resolveFunc = function(data) {

            if (typeof data == 'function') {
                outer = data;
                data = null;
            }

            return outer(inner(data));
        }

        return next = new Chain();

    }

    this.carry = function(twoargs_func) {

        resolveFunc = function(data) {

            var a = data;

            return function(b) {
                return twoargs_func(a, b);
            }
        }

        return next = new Chain();
    }

    this.filter = function(filter) {

        var nextSaved;

        resolveFunc = function(data) {

            var res = filter;
            if (typeof filter == 'function') {
                res = filter(data);
            }

            if (!res) {
                if (next) {
                    nextSaved = next;
                    next = null;
                }
            } else if (!next) {
                next = nextSaved;
                nextSaved = null;
            }

            return data;

        }

        return next = new Chain();

    }

    this.empty = function() {

        var chain = new Chain();

        var emptyFunction = function(data) {
            return data;
        }

        var resChain = chain.filter(emptyFunction);

        resolveFunc = function(data) {

            chain.resolve(data);

            return resChain;

        }

        return next = resChain;

    }

    this.execute = function() {

        var args = arguments;

        resolveFunc = function(data) {

            var func;
            if (typeof data == 'function') {
                func = data;
                return func.apply(null, args);
            }
        }

        return next = new Chain();

    }


    // Additional Functions
    this.compose2 = function(twoargs_func, arg2) {

        var chain = new Chain();

        var resChain = chain.carry(twoargs_func).execute(arg2);

        resolveFunc = function(data) {
            chain.resolve(data);

            return resChain;

        }

        return next = chain;

    }



}
