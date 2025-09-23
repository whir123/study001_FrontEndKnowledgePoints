// ⚠️ 1️⃣ 【 先定义一个 Promise 类 初始化状态和结果 】
class myPromise{
    constructor(executor){// 接收一个函数
        this.state = 'pending';
        this.value = undefined;         //❗️fulfilled 时的值
        this.reason = undefined;        //❗️rejected 时的值
        this.fulfilledCallback = [];    //❗️储存 then方法中 注册的第一个回调函数
        this.rejectedCallback = [];     //❗️储存 then方法中 注册的第二个回调函数

        //❗️resolve 和 reject 函数
        const resolve = (value)=>{  // 箭头函数 保证this指向
            if (this.state !== 'pending') return; // 幂等保护
            this.state = 'fulfilled';
            this.value = value;
            setTimeout(()=>{  //❗️异步执行！！| 放入微队列
                try {
                    this.fulfilledCallback.forEach(a => a(this.value));
                } catch (e) {
                    reject(e);
                };
            }, 0);
        };
        const reject = (reason)=>{
            if (this.state !== 'pending') return; // 幂等保护【某些操作在重复执行时能够保持相同的结果】
            this.state = 'rejected';
            this.reason = reason;
            setTimeout(()=>{  //❗️异步执行！！| 实际上放入微任务队列 setTimeout放入宏任务队列
                try {
                    this.rejectedCallback.forEach(a => a(this.reason));
                } catch (e) {
                    reject(e);
                };
            }, 0);
        };

        // 执行传入函数
        try{
            executor(resolve, reject);
        } catch(reason){
            reject(reason); // ⚠️ 函数本身出错直接reject
        };
    };

    // ⚠️ 2️⃣ 【 实现 .then 方法 】
    then(onFulfilled, onRejected) {
        //❗️如果 onFulfilled, onRejected 不是函数 提供默认值
        onFulfilled = typeof onFulfilled==='function' ? onFulfilled : value=>value;
        onRejected = typeof onRejected==='function' ? onRejected : reason=>{throw reason};
        
        return new myPromise((resolve, reject)=>{ //【 返回一个新的 Promise 】
            this.fulfilledCallback.push((value)=>{ //【 ⚠️ 将一个闭包push回对应的回调函数数组 】
                //❗️❗️push 动作发生在 setTimeout 执行前
                try {
                    resolve(onFulfilled(value));
                } catch (e) {
                    reject(e);
                }
            });
            this.rejectedCallback.push((reason)=>{
                try {
                    resolve(onRejected(reason));
                } catch (e) {
                    reject(e);
                }
            });
        })
    };

    // ⚠️ 3️⃣ 【 实现 .catch 方法 】｜【 catch 就是 then 的语法糖，只关心失败回调 】
    // ⚠️ 本质上：promise.catch(onRejected) = promise.then(null, onRejected)
    catch(onRejected){
        return this.then(null, onRejected);
    };
};

//【-------测试-------】
new myPromise((resolve, reject)=>{
    console.log('执行executor');
    resolve(1);
}).then(
    val => {
        console.log('then1:', val);
        return val+1;
    }
).then(
    val => {
        console.log('then2:', val);
    }
)
//【输出：】
// 执行executor
// then1: 1
// then2: 2

//【-------测试2-------】
const p2 = new myPromise(
    (resolve, reject)=>{
    let rand = Math.random();
    setTimeout(()=>{
        if (rand<0.5) {
            console.log('随机成功:', rand);
            resolve(rand);
        } else {
            console.error('随机失败:', rand);
            reject(rand);
        }
    }, 500)
    }
).then(
    val => {
        console.log('then random1:', val);
        return val+1;
    }
).then(
    val => {
        console.log('then random2:', val);
    },
    // val => {
    //     console.log('then2ERR:', val);
    // }
).catch(
    val => {
        console.log('Catch:', val);
    }
)
/**
 * 情况1:
 * 随机成功: 0.46286659127209395
 * then random1: 0.46286659127209395
 * then random2: 1.462866591272094
 * -------------------------------
 * 情况2:
 * 随机失败: 0.511490265561459
 * Catch: 0.932745071083833 ❕
 */