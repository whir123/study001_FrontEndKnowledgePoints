function recursiveTimeout(){
    console.log('Executing task...');
    let start = Date.now();
    while(Date.now()-start<200);
    setTimeout(recursiveTimeout, 100);
};
// 任务200ms 调度100ms
// recursiveTimeout();

//【 setTimeout回调函数若：非箭头函数 this默认指向全局对象（严格模式下undefined） 】
class MyClass {
    constructor() {
        this.value = 'initial';
    };
    methodWithProblem() {
        setTimeout(function(){
            console.log(this.value);// 此处this不等于MyClass实例
        }, 100);
        // ⚠️ 解决上述问题：1、用箭头函数
        //【普通函数】的 this 取决于它的调用方式。setTimeout 执行回调时，回调函数的 this 默认指向全局对象（在浏览器中是 window），而不是 MyClass 的实例
        //【箭头函数】不会创建自己的 this，会捕获外部 this
        setTimeout(()=>{
            console.log(this.value);
        }, 100);
        // ⚠️ 2、bind()
        setTimeout(function(){
            console.log(this.value);
        }.bind(this), 100); // 绑定外部this
    };
};
const instance = new MyClass();
instance.methodWithProblem(); 
// undefined initial initial

// setInterval: 不取消会一直运行
// setTimeout: 未执行前 应及时取消