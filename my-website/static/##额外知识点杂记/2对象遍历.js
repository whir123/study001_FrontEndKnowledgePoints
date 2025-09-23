// 对象的属性：
// 1️⃣ 位置不同： 自有属性 / 原型链属性
// 2️⃣ 可见性： 可枚举属性 / 不可枚举属性

const sym = Symbol('demo');
const proto = {protoProp: 'proto value'};
const obj = Object.create(proto); // 创建对象 指定它的原型为proto（可以通过原型链访问proto的属性）
console.log(Object.getPrototypeOf(obj) === proto); // true

obj.ownProp = 'own value';
obj[sym] = 'symbol value';
Object.defineProperty(obj, 'nonEnumProp', {
    value: 'non-enumerable value',
    enumerable: false
}); 
// 在对象 obj 上定义一个名为 nonEnumProp 的属性，值为 'non-enumerable value'。
// 该属性的 enumerable 设置为 false，表示它是“不可枚举属性”。

let result = [];
for (let k in obj) {
    result.push(k);
};
console.log(result); // [ 'ownProp', 'protoProp' ] ⭐️会遍历原型链属性

// 配合 Object.prototype.hasOwnProperty.call(obj, k)
result = [];
for (let k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) result.push(k);
};
console.log(result); // [ 'ownProp' ]

// 只返回自身的可枚举的字符串属性
console.log(Object.keys(obj)); // [ 'ownProp' ]

// 返回[自身的]全部字符串属性（含不可枚举）
console.log(Object.getOwnPropertyNames(obj)); // [ 'ownProp', 'nonEnumProp' ]

// 返回自身的全部Symbol属性
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(demo) ]

//【终极方法 ES6】
console.log(Reflect.ownKeys(obj)); // [ 'ownProp', 'nonEnumProp', Symbol(demo) ]