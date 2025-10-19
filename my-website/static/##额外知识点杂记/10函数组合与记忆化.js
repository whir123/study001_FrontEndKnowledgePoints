// 如何实现函数组合？
// 经典实现：compose / pipe ｜ 前者从右向左 后者从左向右

// compose：接受多个函数作为参数 返回一个新的函数 新函数接收初始参数 参数从右侧函数开始传递

const compose = (...funcs) => {
    if (funcs.length === 0) return arg=>arg; 
    if (funcs.length === 1) return funcs[0];
    return funcs.reduce((a,b) => (...args)=>a(b(...args))); // ⚠️
};

const add1 = x => x+1;
const multiply2 = x => x*2;
const subtract3 = x => x-3;

const processedValue = compose(subtract3, multiply2, add1);
console.log(processedValue(5));

// 如何实现函数记忆化？
// 内部维护一个缓存结构(Map, Object) 基于函数的参数生成唯一的key

const memoize = (fn) => {
    const cache = {};

    return function(...args){
        const key = args.length===1 ? args[0] : JSON.stringify(args);
        if (cache.hasOwnProperty(key)){
            console.log(`Fetching from cache for key: ${key}`);
            return cache[key];
        } else {
            console.log(`Calculating result for key: ${key}`);
            const res = fn.apply(this, args);
            cache[key] = res;
            return res;
        };
    };
};

const fibonacci = (n) => {
    if (n<=1) {
        return n;
    }
    return fibonacci(n-1)+fibonacci(n-2);
};
const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(10));
console.log(memoizedFibonacci(10));