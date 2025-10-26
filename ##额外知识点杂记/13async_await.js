// JS 异步编辑语法糖 基于Promises 生成器Generators
// 1️⃣ 代码可读性
// 2️⃣ 错误处理更加直观 配合 try…catch…
// 3️⃣ 调用栈更清晰

// ⚠️ async 声明异步函数 总是返回Promise 非Promise自动封装成resolved的Promise
// ⚠️ await 只能在async函数内部使用 暂停async函数执行 等待Promise决议 返回Promise resolved的值
async function fetchData(url) {
    try {
        const response = await fetch(url); // await第一个Promise
        const data = await response.json(); // await第二个Promise ｜ 不加await data得到的是Promise 而不是实际的数据
        // ⚠️ json() 是 Response 对象的方法，用于将 HTTP 响应体解析为 JSON 格式的数据。它返回一个 Promise，解析完成后得到 JS 对象
        
        console.log(data); // 同步代码
        return data; // 回值被封装为 Promise
    } catch (err) { // 捕获错误
        console.error('Fetch failed:', err);
        throw err; // Promise 被拒绝
    };
};
fetchData("https://api.example.com/data");

// ⭐️ =================================
// ⭐️ await不阻塞主线程 只暂停当前async函数
// ⭐️ 控制权交回事件循环 主线程可执行其他任务
async function sequentialFetched() {
    console.log('开始获取 data1');
    const result1 = await fetchData('api/data1');
    console.log('data1 获取完成');
    
    console.log('开始获取 data2');
    const result2 = await fetchData('api/data2');
    console.log('data2 获取完成');
    
    console.log(result1, result2);
};
sequentialFetched();

// ⭐️ =================================
// ⭐️ ⬆️ 如何实现并发？=> 先创建所有Promise 再Promise.all() / Promise.allSettled() 最后await结果数组
async function concurrentFetches() {
    console.log('开始获取data1和data2');
    const promise1 = fetchData('api/data1');
    const promise2 = fetchData('api/data2');

    const [result1, result2] = await Promise.all([promise1,promise2]);

    console.log('所有数据获取完成');
    console.log(result1, result2);
};
concurrentFetches(); // ⚠️ 推荐加 try...catch 处理异常，避免程序中断