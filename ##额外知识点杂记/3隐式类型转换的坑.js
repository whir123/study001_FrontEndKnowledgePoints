// Type Coercion 
const flag = ([] == ![]);
console.log(flag); // true ❕
/**
 * ➡️ [] == false
 * ➡️ [] == 0
 * ➡️ "" == 0
 */

// ToPrimitive
// ⭐️ 当对象需要转换为原始类型时……
// 1️⃣ 检查对象： [Symbol.toPrimitive] （最高优先级）
// 2️⃣ 转为 Number：尝试 ValueOf() 若结果非原始类型 再调用 toString()
// 3️⃣ 转为 String：先调用 toString()

console.log([10] == 10); // true ❕
console.log({} == '[object Object]');  // true ❕
// {}.toString -> '[object Object]'