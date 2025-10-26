// 1️⃣ Promise.all()
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((res,rej)=>{
    setTimeout(res, 100, 'foo');
    // ⚠️ setTimeout 的第一个参数必须是“函数”，而不是“函数调用的结果”
    // ⚠️ res('foo') 是直接调用 res，会立即执行并返回 undefined（因为 resolve 没有返回值）
    // ⚠️ setTimeout(res('foo'), 100) 实际等价于 setTimeout(undefined, 100)，什么都不会延迟执行，Promise 会立刻变为 resolved。
});
const promise4 = Promise.reject('Error occured');
const promise5 = Promise.resolve(80);

Promise.all([promise1, promise2, promise3, promise4, promise5])
.then(res => console.log(res))
.catch(e => console.log(e)); // Error occured ｜ 会因为某一个失败而立即终止
Promise.all([promise1, promise2, promise3, promise5])
.then(res => console.log(res))
.catch(e => console.log(e)); // [ 3, 42, 'foo', 80 ]

// 2️⃣ Promise.allSettled() ｜ ⭐️ 无论数组里的 Promise 是 fulfilled 还是 rejected，最终都会 resolve，返回所有结果的状态数组（每个元素都有 status 和 value/reason）。
Promise.allSettled([promise1, promise2, promise3, promise4, promise5])
.then(res => console.log(res));
//⭐️[
//   { status: 'fulfilled', value: 3 },
//   { status: 'fulfilled', value: 42 },
//   { status: 'fulfilled', value: 'foo' },
//   { status: 'rejected', reason: 'Error occured' },
//   { status: 'fulfilled', value: 80 }
// ]

// 3️⃣ Promise.race() ｜ ⭐️ 第一个变状态的决定结果（成功/失败）
const promise6 = new Promise((res,rej)=>{
    setTimeout(res, 100, 'one');
});
const promise7 = new Promise((res,rej)=>{
    setTimeout(res, 200, 'two');
});
Promise.race([promise6, promise7]).then(val => console.log(val)); // one

// 4️⃣ Promise.any()
// 只要有一个成功 ｜ 所有失败则抛出 AggregateError