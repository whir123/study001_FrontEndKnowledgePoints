function myCurry(fn){
    return function curried(...args){
        if (args.length>=fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...restArgs){
                return curried.apply(this, args.concat(restArgs));
            }
        }
    }
}