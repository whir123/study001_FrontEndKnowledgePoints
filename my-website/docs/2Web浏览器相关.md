---
id: 2
title: 2-Web浏览器相关
---

# 🌏 Web浏览器相关
---
## 跨域与同源策略
1. `跨域`：一个网页向另一个域（ 不同 `协议` || `域名` || `端口号` ）发起请求的行为
2. `跨域请求`通常发生在：
- 使用 `AJAX` 或 `Fetch API` 请求其他域的数据
- 在网页中嵌套跨域资源（图片 脚本 iframe等）
3. `同源策略(Same-Origin Policy)` ：浏览器的一种安全机制，用于防止不同来源的网页间互相访问数据 保护用户隐私和数据安全
4. 同源的定义：两个网页的 `协议|如http` `域名|如example.com` `端口号|如80` 完全相同 则被认为是同源
5. 同源策略会限制以下行为：
   - `DOM访问`：跨域的`iframe`和主页互相无法访问DOM（但是不阻止页面的加载 这是正常行为 `iframe`可以渲染） 
   - `Cookie` 和 `Storage`：跨域页面无法访问彼此的`Cookie` `LocalStorage` `SessionStorage`
   - `AJAX请求`：跨域的AJAX请求会被浏览器阻止 除非目标浏览器设置了`允许跨域的CORS头`
---
## 如何解决跨域问题
- 1 `CORS（跨域资源共享）`：服务器在响应头中设置 Access-Control-Allow-Origin，允许指定的域名访问资源（ HTTP协议的响应头 `应用层` `Access-Control-Allow-Origin: https://www.example.com` ）
- 2 `JSONP（JSON with Padding）`：通过` <script> `标签加载跨域的` JSON `数据 | 缺点：只支持 GET 请求 安全性较低 容易被恶意代码利用
    ```html
      <!-- `<script>`可以加载跨域的JS文件 而不会触发同源策略 -->
      <!-- `JSONP` 利用了这一点 -->
      <script src="https://api.example.com/data?callback=myCallback"></script>
      <script>
          function myCallback(data) {
              console.log('收到数据:', data);
          }
      </script>
    ```
 - 3 `代理服务器`：通过浏览器与`同源的服务器`通信，而由服务器代替浏览器与目标跨域服务器进行数据交互: 因为浏览器的同源策略`只限制前端的跨域请求`，而`服务器之间的通信`不受同源策略的限制
 - 4 `postMessage`：postMessage 是一种浏览器提供的 API，用于在不同来源的页面之间安全地传递消息
    ```js
      // 主页给 iframe 发消息
      const iframe = document.getElementById('myIframe');
      iframe.contentWindow.postMessage('Hello iframe!', 'https://www.example.com');
      // iframe 接收消息
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://your-domain.com') {
        console.log('收到主页面的消息:', event.data);
        }
      });
    ```
- 主页面可以通过给`iframe`的`src`添加`查询参数` 传递参数给`iframe`
    ```js
      <iframe src="https://www.example.com?data=hello"></iframe>
    ```
- 跨域与同源策略的作用:
   - 保护用户隐私： 防止恶意网站窃取用户数据。
   - 防止跨站脚本攻击（XSS）： 阻止恶意脚本操作其他域的数据。
   - 确保数据安全： 限制未经授权的跨域访问
---
## 跨站脚本攻击（XSS）
跨站脚本攻击 `XSS，Cross-Site Scripting` | 是一种特定场景下的`代码注入攻击`，发生在`浏览器端`，攻击者通过在网页注入恶意脚本（通常是`JavaScript`）来盗取数据、劫持会话、篡改页面等
- XSS 的危害:
  - 窃取用户的 Cookie、LocalStorage 等敏感信息
  - 劫持用户会话，冒充用户身份
  - 注入恶意代码，传播病毒或木马
  - 重定向用户到钓鱼网站
- 如何防御 XSS: 
  - 输入验证：严格验证用户的输入内容 确认不含恶意代码
  - 输出编码：对动态生成的 HTML 内容进行转义，防止脚本执行 例：将`<`转义为`&lt`
  - 使用 `CSP（内容安全策略）`：通过设置 HTTP 响应头，限制页面加载的资源 例：`Content-Security-Policy: default-src 'self'; script-src 'self'`
  - 避免直接执行用户输入：不使用 `eval()`、`innerHTML` 等危险方法
    - `eval()` :  `JavaScript` 中的一个内置函数 用于将字符串作为代码执行 主要功能是动态解析和执行代码
      ```js
        const code = "console.log('Hello, World!')";
        eval(code); // 输出 "Hello, World!"
      ```
    - `innerHTML` 是 DOM 元素的一个属性，用于设置或获取元素的 HTML 内容
      ```js
        const div = document.getElementById('example');
        div.innerHTML = '<p>Hello, World!</p>';
      ```
---
## CSP（内容安全策略）
`CSP`（`Content Security Policy`，内容安全策略） 是一种 Web 安全机制，用于防止`跨站脚本攻击（XSS）`及`浏览器端的恶意内容注入`
- 通过限制网页可以加载的资源类型、来源以及执行的脚本，来提高 Web 应用的安全性: CSP 可以控制：`脚本（script-src）``样式（style-src）``图片（img-src）``字体（font-src）``媒体（media-src）``连接（connect-src）``iframe 对象``表单提交`等
- 通过 `HTTP` 响应头（`Content-Security-Policy`）或 `HTML 元标签（<meta>）`来配置 (`HTTP 响应头`优先于 `<meta> 标签`)
---
## 对浏览器内核的理解
`渲染引擎(Render Engine)`和`JS引擎`
- **渲染引擎**：负责取得网页的内容（html、xml、图像等），整理讯息（例如css），以及计算网页的显示方式，然后输出到显示器或打印机 ｜ 构建 `DOM`、`CSSOM`，再合并为`渲染树（Render Tree）`，最后排版绘制
- **JS引擎**：专门负责 `解析`、`编译`和`执行` JS，提供运行时环境（包括`垃圾回收`、`内存管理`等） ｜ 
最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎
- **渲染引擎**：
  - IE → Trident
  - `Chrome` → WebKit（早期） → `Blink`（2013 年起，Google 分支出来）
  - `Edge` → `Blink`
  - Firefox → Gecko
  - Safari → WebKit（Apple 主导）
  - Opera → 早期 Presto → 后来改用 Blink（2013 年后）
- **JS引擎**：
  - IE (IE3 ~ IE8) → JScript（微软自研，和 ECMAScript 有兼容性问题）
  - IE9 ~ IE11 → Chakra（微软下一代引擎）
  - `Chrome` → `V8`
  - Edge (旧版) → Chakra（EdgeHTML 内核 + Chakra JS 引擎）
  - `Edge` (新版, `Chromium 内核（Blink+V8）`) → `V8`（完全跟 Chrome 一样） 
  - Firefox → TraceMonkey（早期） → JägerMonkey → IonMonkey（现代）
  - Safari → JavaScriptCore（也叫 Nitro）
  - Opera → Carakan（早期） → 后来迁移到 V8（跟 Chrome 保持一致）
- `Node.js` 只有 `JS引擎 (V8)`，没有“渲染引擎”
---
## 渲染引擎渲染过程
1. 【HTML解析】自上而下 先解析 `HTML` 生成 `DOM Tree (Document Object Model Tree)`
2. 【CSS解析】解析到 `link / <style>标签` 开始解析 `CSS` 生成 `CSSOM Tree (CSS Object Model Tree)` | 解析 `HTML` 和 解析 `CSS` 是并行的
3. 【JavaScript解析】解析到 `<script>标签` 开始解析脚本 停止解析文档 ｜ 脚本有可能更改`DOM / CSSOM` 继续解析浪费资源 ｜ 所以一般把`<script>`放在`<body>`后
4. 【生成渲染树】当`DOM Tree`与`CSSOM Tree`生成后 两者结合进行布局 计算它们的大小位置等布局信息 形成一个能够表示这所有信息的内部表示模型 可称为`渲染树 Render Tree` | 渲染树只包含需要显示的节点（如 `display: none` 的不会进入）
5. 【布局】根据`渲染树 Render Tree` 计算每个元素的几何信息 得到布局树 确定页面排版
6. 【绘制】根据布局结果，将每个节点的样式（颜色、阴影、边框、文字等）绘制成位图
7. 【合成】页面可能会被拆分成多个图层（`layer`） 通过合成器线程（`Compositor Thread`）图层合成（图层合成 GPU加速） → 显示到屏幕
- **重绘 (Repaint)**
  - 当元素的外观发生改变 但几何结构不变时
  - 例如：改变 color / backgroud-color / visibility
    - 使用 visibility: hidden 替代 display: none
  - 只更新【绘制】阶段 不触发【布局】 代价比较小
- **回流 (Reflow / Layout)**
  - 页面的几何结构发生改变时触发（大小 位置 结构）
  - 例如：添加/删除DOM节点 / 改变文字内容 / 改变窗口大小
  - 渲染树重新计算 【布局】+【绘制】 代价大
  - 回流必引起重绘
---
## JS 引擎的执行过程
- `JavaScript` 是单线程语言 一个浏览器页面只有一个线程在执行js脚本代码
- 异步执行 通过`事件循环（Event Loop）`实现
- **JS 引擎执行分为3阶段**：语法分析 ➡️ 预编译阶段 ➡️ 执行阶段
  - 首先按顺序加载由`<script>标签`分割的`js代码块`
  - 加载js代码块完毕后，立刻进入以上三个阶段，然后再按顺序查找下一个代码块，再继续执行以上三个阶段
  - 无论是`外部脚本文件（不异步加载）`还是`内部脚本代码块` 都是一样的原理 并且都在`同一个全局作用域`中
  - **语法分析**：分析该`js脚本代码块`的语法是否正确，如果出现不正确，则向外抛出一个语法错误（SyntaxError），停止该js代码块的执行，然后继续查找并加载下一个代码块
  - **预编译阶段**：每进入一个不同的运行环境(`全局环境/函数环境/eval环境`)都会创建一个相应的`执行上下文（Execution Context）` || 每进入一个不同的运行环境都会创建一个相应的`执行上下文`  ||  js引擎会以栈的方式对这些`执行上下文`进行处理，形成`函数调用栈（call stack）`，栈底永远是`全局执行上下文（Global Execution Context）`，栈顶则永远是`当前执行上下文`
- `JS引擎`的作用比较统一，在浏览器的实现中必须含有`DOM`和`BOM` `JS引擎`负责对`JavaScript`进行解释、编译和执行，以使网页达到一些动态的效果
- `DOM (Document Object Model)` 文档对象模型 表示网页的内容结构 (节点、元素、文本等)
- `BOM (Browser Object Model)`浏览器对象模型 提供与浏览器窗口相关的对象和方法 (如 `window`、`navigator`、`location`、`history`、`screen`)
- `DOM`/`BOM` 提供的对象 是 JS 可以操作的环境的一部分 但它们本身不属于`JS引擎` | 浏览器提供的API `JS引擎`通过这些 API 来操作网页内容或浏览器环境
---
## 事件循环 Event Loop
1. **浏览器JS异步执行的原理**
- `JS`是单线程的（一次只能做一件事）
- 浏览器是多线程的 `JS`需要执行异步任务时 浏览器会启动另一个程序去执行该任务
- 所以：`JS`的单线程 —> 用来执行`JS`的代码的线程只有一个 —> 浏览器提供的`JS引擎线程`【`主线程`】
- 浏览器还有`定时器线程`和`HTTP请求线程`等
- 浏览器不仅有多个`线程` 还有多个`进程`（浏览器进程 渲染进程 GPU进程 插件进程等） 每个tab标签页都是一个独立的进程（所以一个tab标签崩溃后 其他基本不受影响）
  - 【 **进程**是操作系统**资源分配**的基本单位 | 是程序的一次执行过程 拥有独立的内存空间 | **一个进程**可以包含**多个线程** 线程共享进程的资源 但是每个线程有自己的执行路径 】
  - 【**线程**是进程中的一个执行任务 是处理器任务**调度和执行**的基本单位 比进程更小的能**独立运行**的基本单位】
  - 【 以 Chrome 为例 】
  - ```------------------------------------------------------------------------------```
    - **浏览器进程** ｜ `负责浏览器界面（地址栏、书签、前进/后退按钮等 UI）、进程管理`
    - **渲染进程** ｜ ⭐️ `一个 Tab 页面通常对应一个渲染进程，负责 HTML 解析、CSS 解析、JS 执行、DOM 构建、布局、绘制`
        - **主线程（Main Thread）** ｜ 渲染进程里的“核心线程”。负责执行 JS 引擎（V8）、解析 HTML/CSS、构建 DOM/CSSOM、执行事件循环、处理用户交互、布局和绘制。常说的 “JavaScript 是单线程的”，指的是 JS 在渲染进程的 主线程 上运行
        - **Web Worker 线程**
        - 合成线程
        - 光栅化线程
        - ......
    - **GPU进程** ｜ `所有页面和 UI 的合成、加速绘制`
    - **网络进程** ｜ `负责网络请求（HTTP、WebSocket 等）`
    - **其他辅助进程（插件、存储等）**
  - ```------------------------------------------------------------------------------```

1. **事件驱动浅析**
- `事件触发`、`任务选择`、`任务执行`等 --- `事件驱动机制`来完成
- NodeJS 浏览器 都是基于事件驱动的
- 由特定的事件来触发特定的任务（点击事件、定时器线程在计时结束后自动触发、等等）
- `事件循环（Event Loop）`实际上是在`事件驱动模式`中管理和执行事件的一套流程
- 有事件触发后 被触发的事件按顺序暂存在一个队列中 JS的同步任务执行完之后 会从这个队列取出要处理的事件并进行处理

2. **浏览器中的事件循环**
- 【执行栈与任务队列】
  - [执行栈与任务队列图示](./2Web浏览器相关/执行栈与任务队列.png)
  - JS解析一段代码时 将`同步代码`按顺序安排在某个地方 ➡️ `执行栈` 依次执行里面的函数
  - `异步代码`交给其他线程处理 
  - 当前执行栈所有同步代码执行完成后 从一个队列中取出**已经完成的异步任务的回调**加入执行栈继续执行 遇到异步任务继续交给其他线程……
  - 在**事件驱动的模式**下 至少包含了一个**执行循环**来检测任务队列是否有新的任务 通过不断循环去取出异步回调来执行 这个过程就是**事件循环** 每一次循环就是一个**事件周期**或者称为一次**tick**
- 【宏任务和微任务】
  - 根据任务的不同 可分为`宏任务(macro task)`队列和`微任务(micro task)`队列
  - 执行栈在同步代码执行完成之后 优先检查`微任务(micro task)`队列【`微任务(micro task)`队列一般只有一个 `宏任务(macro task)`队列可能有多个】
  - 常见微任务：`promise.then()` `promise.catch()`
  - 常见宏任务：`setTimeout()` `setInterval()` `setImmediate()`
  - 微任务在这次事件循环的尾部执行 宏任务在下次事件循环的首部执行
  - 小总结：一个`事件循环（tick）`内部的执行顺序（浏览器）：**先同步任务，再异步任务，异步任务又分微任务和宏任务，先微任务再宏任务**

3. **NodeJS中的事件循环**
- JS引擎本身不实现事件循环机制 是由它的宿主实现 NodeJS中大致和浏览器类似
- [NodeJS System](./2Web浏览器相关/NodeJsSystem.png)
---
## dispatchEvent/addEventListener & EventEmitter
🔷 `dispatchEvent/addEventListener`（`DOM 事件机制`）
- DOM 事件机制是 `JavaScript` 原生的事件处理机制，主要用于浏览器中处理 `DOM` 元素上的事件（例如点击、键盘输入等） | 遵循 `W3C` 的事件模型，包括`事件捕获`和`事件冒泡`阶段
- 【 核心方法 】｜ `addEventListener` 用于监听事件 ｜ `dispatchEvent` 用于手动触发事件 ｜ `removeEventListener` 用于移除事件监听
  ```js
    const button = document.querySelector("button");

    // 添加事件监听器
    button.addEventListener("click", (event) => {
      console.log("按钮被点击了！");
    });

    // 手动触发事件
    const event = new Event("click");
    button.dispatchEvent(event); // 控制台输出：按钮被点击了！
  ```

🔷 来自 `Node.js` 核心模块 `events` 主要用于非浏览器环境下的事件驱动编程 | 是一个通用的“事件发布订阅器”。任何对象都可以继承它，具备“注册事件监听器”和“触发事件”的能力 | 这种思想和 `mitt（事件总线库）`也很像
- `.on(event, listener)` → 注册监听
- `.once(event, listener)` → 注册一次性监听
- `.emit(event, ...args)` → 触发事件
- `.off(event, listener)` / `.removeListener` → 移除监听器
- `.removeAllListeners(event)` → 移除某个事件的所有监听器
- [手写简单的EventEmitter](./2Web浏览器相关/EventEmitter.js)
---
## AJAX
`AJAX`（全称：`Asynchronous JavaScript and XML`，异步`JavaScript`与`XML`），是一种在不重新加载整个网页的情况下，可以与服务器交换数据并更新部分网页内容的网页开发技术 | `Ajax`在`浏览器`是通过`XMLHttpRequest`对象来实现数据传输的
- AJAX 的工作流程
  - **事件触发** | 比如，用户点击按钮或页面加载时 js 脚本会触发 AJAX 请求
  - **创建 `XMLHttpRequest` 对象** | 这是浏览器提供的 API，用于和服务器交换数据
  - **配置请求参数** | 设置请求方法（`GET`/`POST`/`PUT`/`DELETE`）、目标`URL`、是否异步等
  - **发送请求** | 通过 `send()` 方法向服务器发送请求，并在此期间页面不会被阻塞
  - **服务器处理并响应** | 服务器收到请求后，进行逻辑处理，将响应数据返回前端（可以是`JSON`、`XML`、`HTML`、`纯文本`等）
  - **前端接收并处理响应** | 利用事件监听（如 `readyState`/`onreadystatechange` 或 `onload`），当数据返回时，处理响应并局部更新页面内容
- 🔷 原生 XMLHttpRequest 示例
  ```js
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.example.com/common/get?name=data&age=data', true); // ⚠️ true 默认｜表示请求是异步
    xhr.send();   // ⚠️ 把请求发送出去
    // xhr.open('POST', 'https://api.example.com/common/post', true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // ⚠️ 请求头
    // xhr.send('name=data&age=data');   // ⚠️ 说明请求内容 把请求发送出去
    xhr.onreadystatechange = function() { 
        if(xhr.readyState === 4 && xhr.status === 200) { // 4 可以写成 XMLHttpRequest.DONE
            var response = JSON.parse(xhr.responseText);
            // 局部操作DOM，刷新内容
            document.getElementById('result').innerText = response.msg;
        }
    };
  ```
- 🔷 jQuery 简化AJAX
  ```js
    $.ajax({
        url: 'https://api.example.com/data',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#result').text(data.msg);
        }
    });
  ```
- ⭐️ 现代 `fetch API` 示例 ｜ 现代浏览器内置的`API` 用于替代传统的`XMLHttpRequest` 它基于`Promise` 提供了更简洁的异步操作方式
  ```js
    fetch('https://api.example.com/data') // ⚠️ 默认情况下，fetch 的请求方式就是 GET
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = data.msg;
        });
    //——————————————————————————————————
    fetch('https://api.example.com/common/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'data',
        age: 20,
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
    })
  ```
- ⭐️ `Axios` ｜ 基于`Promise`的第三方`HTTP`客户端库 支持浏览器和`Node.js`环境 对`XMLHttpRequest`进行了封装 提供了更丰富的功能
  ```js
    axios.get('https://api.example.com/common/get?name=data&age=data').then(xxxxxxx);
    //【 ⬇️ async / await 】
    (async () => {
      //const res = await axios.get('https://api.example.com/common/get?name=data&age=data');
      //也能写成：
      const res = await axios.get('https://api.example.com/common/get', {
        params: {
          name: 'data',
          age: 20,
        }
      });
      console.log(res.data);
    })()
  ```
- 【 优点 】
  - 无需刷新整个页面，响应更快、更流畅；
  - 减少带宽消耗：只请求/响应页面部分数据；
  - 更动态的交互能力：实现异步数据加载，条件查询，实时校验等高级交互。
- 【 注意事项与常见问题 】
  - 同源策略与跨域问题 ｜ 默认情况下，`AJAX` 受同源策略限制，需服务器端支持 `CORS（跨域资源共享）`或使用 `JSONP` 进行跨域访问
  - 现代浏览器皆完美支持 `XMLHttpRequest`/`fetch`，但老浏览器须关注兼容性
  - 注意异步下顺序，合理处理 `Promise`/`回调`，避免竞态与回调地狱
  - 安全问题 | 防止`CSRF`/`注入攻击`，验证数据有效性和来源
- 现代的 `Vue`、`React` 或 `Angular` 等框架通常用 `fetch` 或 `axios` 等库封装 `AJAX` 请求，管理 `API` 与组件状态解耦