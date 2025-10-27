/**
 * 封装 setTimeout 到 Promise
 * @param {number} delay - 延迟毫秒数
 * @returns {Promise<void>}
 */
function delayPromise(delay){
    return new Promise ((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, delay);
    });
};

async function renTaskQueue() {
    const start = Date.now();

    console.log('task 1 start...' + String(Date.now()-start));
    await delayPromise(1000); // ⚠️ 暂停【当前async函数】执行
    console.log('task 1 over' + String(Date.now()-start));

    console.log('task 2 start...' + String(Date.now()-start));
    await delayPromise(1000);
    console.log('task 2 over' + String(Date.now()-start));
};
renTaskQueue();

// ⭐️ 不用上述 async/await 而是使用 .then 构建任务队列
Promise.resolve()
.then(()=> delayPromise(1000))
.then(()=> console.log('Task A finished after 1s'))
.then(()=> delayPromise(1000))
.then(()=> console.log('Task B finished after 1s'));

// ⚠️ async/await 和 then链式是两个独立的异步队列，互不等待。各自内部是串行，整体是并发，所以输出会交错
// ⚠️ delayPromise：这里 Promise 的决议（resolve）是由 setTimeout 触发的 ｜ setTimeout 先排队为宏任务，等到时间到才触发 Promise 的微任务链