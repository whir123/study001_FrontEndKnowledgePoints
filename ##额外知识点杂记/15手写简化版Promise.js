class SimplePromise {
    constructor(executor){
        this.state = 'pending';

        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallBacks = [];

        const resolve = (value)=>{
            if (this.state==='pending'){
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach(callback => {
                    setTimeout(()=>callback(this.value), 0);
                });
            };
        };
        const reject = (reason)=>{
            if (this.state==='pending'){
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallBacks.forEach(callback => {
                    setTimeout(()=>callback(this.reason), 0);
                });
            };
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        };
    };

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled==='function' ? onFulfilled : value=>value;
        onRejected = typeof onRejected==='function' ? onRejected : reason=>{throw reason};
        return new SimplePromise((resolve, reject)=>{
            const handleFulfilled = (value)=>{
                try {
                    const result = onFulfilled(value);
                    resolve(result);
                } catch (err) {
                    reject(err);
                };
            };
            const handleRejected = (reason)=>{
                try {
                    const result = onRejected(reason); // 失败回调返回普通值时 新Promise成功
                    resolve(result);
                } catch (err) {
                    reject(err);
                };
            };

            if (this.state==='fulfilled'){
                handleFulfilled(this.value);
            } else if (this.state==='rejected'){
                handleRejected(this.reason);
            } else {
                this.onFulfilledCallbacks.push(()=>{
                    setTimeout(()=>{handleFulfilled(this.value)}, 0);
                });
                this.onRejectedCallBacks.push(()=>{
                    setTimeout(()=>{handleRejected(this.reason)}, 0);
                });
            };
        });
    };

    catch (onRejected) {
        return this.then(undefined, onRejected);
    };
};

// 使用示例：
new SimplePromise((res, rej)=>{
    setTimeout(()=>{
        const num = Math.random();
        if (num>0.5) {
            res('成功：'+num);
        } else {
            rej('失败：'+num);
        };
    },10);
})
.then(result => {
    console.log('第一个 then 成功：', result);
    return result+'->链式调用';
})
.then(result => {
    console.log('第一个 then 成功：', result);
    return result+'->链式调用';
})
.catch(err => {
    console.log('捕获全局错误', err);
})