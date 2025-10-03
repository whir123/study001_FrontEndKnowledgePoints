//-------------------------------------------------
for (var i=0; i<5; i++){
    console.log(i);
}; // 01234

for (var i=0; i<5; i++){
    setTimeout(()=>{
        console.log(i);
    },100);
}; // 55555

// ⭐️ 立即执行函数为每次迭代创建新的作用域
// 将i作为参数捕获到新作用域
for (var i=0; i<5; i++){
    (function(index){
        setTimeout(()=>{
            console.log(index);
        },100);
    })(i);
}; // 01234

// ⭐️ var => let/const

// 🚨 闭包捕获的是“引用” 变量值改变 访问到的也会改变
// 判断依据是「定义位置」 与「执行位置」无关