/**
 * 1️⃣ 迭代方法 ｜ forEach map filter reduce...
 * 2️⃣ 修改原数组 ｜ push pop splice...
 * 3️⃣ 返回新数组 ｜ slice concat...
 */

const arr = [1,2,3,4,5];
const res1 = arr.filter(a => a>3);
console.log(res1); // [4,5]

const res2 = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(res2); // 15

// map forEach
// 前者返回新数组（所以可以链式调用）
// 后者返回 undefined