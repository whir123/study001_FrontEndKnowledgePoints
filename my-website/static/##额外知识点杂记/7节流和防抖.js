/* throttle */
function throttle(fn, delay) {
    let lastTime = 0;
    return function(...args) {
        let now = Date.now();
        if (now-lastTime>=delay){
            fn.apply(this, args);
            lastTime = now;
        };
    };
};
// 直接写 fn(...args)，那么 fn 内部的 this 会丢失（变成 undefined 或 window，取决于严格模式）
// 用 fn.apply(this, args) 可以保证 throttle 返回的新函数被调用时，
// fn 内部的 this 和 throttle 返回的新函数的 this 保持一致。
// 异步用 this 时（比如 setTimeout 里），才需要提前保存 this 到变量里。


/* debounce */
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        let context = this;
        if(timer) {
            clearTimeout(timer);
        };
        timer = setTimeout(()=>{
            fn.apply(context, args);
        },delay);
    };
};
// setTimeout 回调里的 this 默认是 window（或 undefined，严格模式），所以需要保存外层 this