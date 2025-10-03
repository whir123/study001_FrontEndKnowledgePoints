// ⭐️ Higher-Order Functions（HOF）与 Currying ｜ 函数式编程的基石
// javaScript函数“一等公民”

// 简单基础柯里化
function curried(x){
    return function(y){
        return x+y;
    };
};
let a = curried(5);
console.log(a(8)); // 13
console.log(curried(1)(2)); // 3

// 柯里化
function curriedPlus(fn, ...args1){
    return function (...args2){
        let allArgs = [...args1, ...args2];
        if (allArgs.length>=fn.length){
            return fn(...allArgs);
        } else {
            return curriedPlus(fn, ...allArgs);
        };
    };
};
const fn = function(w,x,y,z){
    return w+x+y+z;
};
console.log(curriedPlus(fn,1,2)(3,4)); // 10
console.log(curriedPlus(fn,1)(2,3,4)); // 10

// sum
function sum(...args){
    return (...next)=>{
        let allArgs = [...args, ...next];
        if (next.length===0){
            return allArgs.reduce((a,b)=>a+b,0);
        } else {
            return sum(...allArgs);
        };
    };
};
console.log(sum(1,2)(8,9)()); // 20
console.log(sum(1,2,8)(6)(3)()); // 20