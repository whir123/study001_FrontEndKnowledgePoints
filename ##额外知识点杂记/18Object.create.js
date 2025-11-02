// 直接设置新对象的原型 无需通过构造函数和new操作符
// 更直接表达“基于另一对象”的关系

const animal = {
    type: "Animal",
    sayHello: function () {
        console.log(`Hello from a ${this.type}`);
    }
};
const dog = Object.create(animal); // ⚠️
dog.type = 'Dog';
dog.name = 'Buddy';
console.log(dog.type); // Dog
dog.sayHello(); // Hello from a Dog

// 创建无原型链对象
const pureObject = Object.create(null);
pureObject.name = 'No Prototype';
console.log(pureObject.name); // No Prototype
console.log(pureObject.__proto__); // undefined