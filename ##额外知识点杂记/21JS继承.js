// 1 原型链继承
function Parent() {
    this.name = 'parent';
    this.colors = ['red', 'blue'];
};
Parent.prototype.sayName = function(){
    console.log(this.name);
};
function Child() {
    this.age = 10;
};
Child.prototype = new Parent(); // ⚠️ Child的原型变成Parent的一个实例
Child.prototype.constructor = Child; // ⚠️ 修复constructor
Child.prototype.sayAge = function() {
    console.log(this.age);
};
const instance1 = new Child();
instance1.sayName(); // parent
console.log(instance1.colors); // [ 'red', 'blue' ]

// 2 构造函数继承
function Child2() {
    Parent.call(this);
    this.age = 10;
};
const instance2 = new Child2();
console.log(instance2.colors); // [ 'red', 'blue' ]

// 3 组合继承
function Parent3(name){
    this.name = name;
};
Parent3.prototype.sayHi = function(){
    console.log('hi',this.name);
};
function Child3(name){
    Parent3.call(this, name);
};
Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3;
const instance3 = new Child3('child');
instance3.sayHi(); // hi child

// 4 原型式继承

// 5 寄生式继承

// 6 寄生组合式继承

// 7 ES6 Class 语法糖
class A {
    constructor(name) {
        this.name = name;
    };
    sayHi(){console.log('hi',this.name)};
};
class B extends A {
    constructor(name) {
        super(name);
    };
};
let test = new B('bbb');
test.sayHi(); // hi bbb