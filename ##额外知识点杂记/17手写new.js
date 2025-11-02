// 1 创建新对象 
// 2 设置原型链 Prototype指向Constructor.prototype
// 3 绑定this 执行构造函数
// 4 处理返回值

function myNew(Constructor, ...args){
    // 1、2 Object.create() 静态方法以一个现有对象作为原型，创建一个新对象（同时创建对象并设置原型）
    const instance = Object.create(Constructor.prototype);

    // 3
    const result = Constructor.apply(instance, args);

    // 4 
    const isObject = typeof result==='object' && result!=='null';
    const isFunction = typeof result==='function';
    if (isObject || isFunction) return result;
    return instance;
};

function myNewAdvanced(Constructor, ...args){
    if (typeof Constructor!=='function') {
        throw new TypeError('Constructor must be a function');
    };
    return Reflect.construct(Constructor, args); // ⚠️
    // ⭐️ Reflect.construct() 方法的行为有点像 new 操作符 构造函数，相当于运行 new target(...args).
    // ⭐️ 原始写法用 Object.create 和 apply，适合普通构造函数，但对 ES6 class 构造器不兼容
    // ⭐️ 这种写法不仅兼容普通构造函数，还能兼容 ES6 class 构造器
};