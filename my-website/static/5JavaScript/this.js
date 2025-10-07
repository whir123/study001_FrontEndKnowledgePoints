function s(){
    console.log(0,this);
}
s(); // 0 <ref *1> Object [global] {...}
// 打印时会输出 global 对象的所有内容（很多系统级属性和方法）
// ⚠️ 函数是普通调用（非对象调用） this 默认指向全局对象
// 在 Node.js 环境 指向 global 对象
// 在浏览器环境 指向 window 对象

// 新建对象s1
var s1 = {
    t1: function(){ // 普通函数
        console.log(1,this);
        s(); // 此次调用仍然相当于 window.s()
    },
    t2: () => { // 箭头函数
        console.log(2,this);
    },
    t3: { // 对象调用普通函数
        tt1: function() {
            console.log(3,this);
            s(); // 非严格模式下，普通函数的 this 默认指向全局对象 | 在严格模式下，普通函数的 this 是 undefined
        }  
    },
    t4: { // 对象调用箭头函数
        tt1: () => {
            console.log(4,this);
        }  
    },
    t5: function(){ // 函数调用箭头函数
        return {
            tt1: () => {
                console.log(5,this);
            }
        }
    }
}

// ⚠️ 【以下在node.js环境中】
s1.t1(); // 1 {t1: [Function: t1],t2: [Function: t2],t3: { tt1: [Function: tt1] },t4: { tt1: [Function: tt1] },t5: [Function: t5]}
// ⚠️ this 指向 s1 对象

s1.t2(); // 2 {}
// ⚠️ 箭头函数不绑定自己的 this，它继承定义时所在作用域的 this
// t2 定义时的作用域是 s1 的定义作用域，而 s1 是在全局作用域中定义的
// 在 Node.js 中，模块的顶层作用域中 this 是一个空对象 {}（在浏览器中是 window）

s1.t3.tt1(); // 3 { tt1: [Function: tt1] }
// ⚠️ 函数是通过对象调用（如 obj.func()），this 指向调用该函数的对象

s1.t4.tt1(); // 4 {}
// ⚠️ 同2 tt1 定义时的作用域是 s1 的定义作用域

s1.t5().tt1(); // 5 {t1: [Function: t1],t2: [Function: t2],t3: { tt1: [Function: tt1] },t4: { tt1: [Function: tt1] },t5: [Function: t5]}
// t5 是普通函数，调用方式是 s1.t5()，因此 this 指向调用该函数的对象，即 s1

// ⚠️ 【浏览器环境中：（0 2 4 都一样了）】
/**
 * 0 Window {0: global, 1: global, 2: global, 3: global, 4: global, 5: global, window: Window, self: Window, document: document, name: '', location: Location, …}
 * 1 {t3: {…}, t4: {…}, t1: ƒ, t2: ƒ, t5: ƒ}
 * 0 Window {0: global, 1: global, 2: global, 3: global, 4: global, 5: global, window: Window, self: Window, document: document, name: '', location: Location, …}
 * 2 Window {0: global, 1: global, 2: global, 3: global, 4: global, 5: global, window: Window, self: Window, document: document, name: '', location: Location, …}
 * 3 {tt1: ƒ}
 * 4 Window {0: global, 1: global, 2: global, 3: global, 4: global, 5: global, window: Window, self: Window, document: document, name: '', location: Location, …}
 * 5 {t3: {…}, t4: {…}, t1: ƒ, t2: ƒ, t5: ƒ}
 */