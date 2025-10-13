// myCall
Function.prototype.myCall = function(thisArg, ...args){
    if (typeof this !== 'function') throw new TypeError('need function');

    let context = (thisArg==undefined) ? globalThis : Object(thisArg);
    let fn = Symbol();
    context[fn] = this;

    // ⚠️ myCall 的参数是离散传递（...args），即使没有参数，...args 也是空数组，不会出现 undefined 或 null 的情况

    // ⚠️ 无论 context[fn] 是否抛出异常 finally 里的 delete context[fn] 都会被执行
    // 保证 context 干净，不会残留属性
    let res;
    try { res = context[fn](...args); }
    finally { delete context[fn]; }
    return res;
};

// myApply
Function.prototype.myApply = function(thisArg, argsArr){
    if (typeof this !== 'function') throw new TypeError('need function');

    let context = (thisArg==undefined) ? globalThis : Object(thisArg);
    let fn = Symbol();
    context[fn] = this;

    let arr = Array.from(argsArr||[]); // 防止调用时没传入第二个参数

    let res;
    try { res = context[fn](...arr); }
    finally { delete context[fn]; }
    return res;
};

// myBind
Function.prototype.myBind = function(thisArg, ...args){
    
}