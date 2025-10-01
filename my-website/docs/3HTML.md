---
id: 3
title: 3-HTML
---

# 📑 HTML
---
## HTML 和 XHTML
`HyperText Markup Language` 和 `Extension HyperText Markup Language`
* 前者：基于`SGML（Standard Generalized Markup Language）`的标记语言 用于定义网页中的内容和结构 语法相对宽松 容错性高
* HTML页面：通常使用 text/html 作为MIME类型
* 后者：基于XML（Extension Markup
 Language）的标记语言 遵循XML的严格语法规则 XHTML是HTML的4.01严格升级版
* XHTML页面：应使用 application/xhtml+xml 作为MIME类型 如果使用text/html 浏览器会以HTML的方式解析
* 所有浏览器都支持HTML；现代浏览器支持XHTML 但通常以HTML的方式解析XHTML页面 除非MIME类型设置为 application/xhtml+xml 

补充：
* `SGML（Standard Generalized Markup Language）`一种用于定义标记语言的国际标准（ISO 8879），是 HTML 和 XML 的祖先
* `HTML` 和 `XML` 都是 `SGML` 的简化和衍生版本，分别用于网页开发和数据结构化
* `MIME 类型`是一种用于描述互联网中传输的数据类型的标准。它最初是为电子邮件设计的，但现在广泛用于 HTTP 和其他协议中：`text/html 表示 HTML 文档` `image/png 表示 PNG 图像` `application/json 表示 JSON 数据`
---
## HTML 语义化
总结为：`根据内容选择标签，用最恰当的标签来标记内容`
- 语义化好处 :
  - 使HTML结构变得清晰，有利于维护代码和添加样式
  - 通常语义化HTML会使代码变的更少，使页面加载更快
  - 即使在没有CSS样式的条件下，也能很好地呈现出内容结构、代码结构
  - 便于团队开发和维护，语义化更具可读性，遵循W3C标准，可以减少差异化
  - 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页
  - 提升搜索引擎优化(SEO)的效果。和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息，爬虫可以依赖于标签来确定上下文和各个关键字的权重
---
## SEO 和 现代可访问性标准
1. `SEO Search Engine Optimization`: 通过优化网站内容、结构和外部链接等方式，提高网站在搜索引擎（如 Google、Bing、百度）中的排名，从而增加网站的自然流量和曝光度
- 提高网站的可见性： 让网站更容易被搜索引擎收录和索引
- 提升用户体验： 提供高质量内容，满足用户搜索需求
- 增加流量和转化率： 吸引更多的目标用户，并促使其采取特定行动（如购买或注册）
- 1 技术 SEO
  - 网站结构优化： 确保网站对搜索引擎友好，例如使用清晰的`URL结构`和站点地图。
  - 页面加载速度： 提高页面加载速度，如优化图片、使用缓存等。
  - 移动友好性： 确保网站在移动设备上的显示效果良好（`响应式设计`）。
  - HTTPS 安全性： 使用 HTTPS 提高网站的安全性。
- 2 内容 SEO
- 3 外部 SEO
- 4 用户体验
2. 现代可访问性标准 `Web Accessibility Standards` : 旨在确保网站对所有用户（包括有视觉、听觉、肢体障碍或认知障碍的用户）都可以轻松访问和使用
- 全球最常用的可访问性标准是 `WCAG`（Web Content Accessibility Guidelines），由 W3C 发布。目前的最新版本是 `WCAG 2.1` (2025)
- 可访问性核心目标：
  - `包容性`： 确保不同能力的用户都能平等地获取信息。
  - `无障碍设计`： 为残障人士提供辅助功能（如屏幕阅读器支持、键盘导航等）。
  - `法律合规`： 遵守可访问性相关法律法规（如美国的 ADA、欧洲的 EN 301 549）
---
## iframe 与 frame 的区别
二者都是用于在页面中`嵌套其他网页的HTML元素`
* `frame` 一种框架元素 用于将网页分成多个独立的区域 在`HTML5`中废弃:
  * 每个区域可以加载不同的网页 通过 `<frameset>` 元素实现的
  * 早期HTML的布局方式 
  * 对`SEO (Search Engine Optimization)`有严重影响 搜索引擎可能无法正确索引框架中的内容
  * 不支持`现代可访问性标准` 用户体验较差
* `iframe` 一种内联框架 在HTML4中被引入:
  * 一个独立的HTML元素 可以直接嵌套在HTML文档任何地方
  * 允许在一个网页中加载另一个网页（甚至是`跨域的网页`）
  * 嵌套内容可能不会被搜索引擎索引 但对主页面SEO影响较少 支持现代可访问性标准（如ARIA标签）
---
## Attribute 和 Property
* `Attribute（HTML属性）`：写在HTML标签中的内容 表示元素的初始状态； 静态的 描述HTML元素默认行为：
    ```html
      <input type="text" value="hello" id="myInput">
      <!-- type value id都是属性（Attribute） -->
    ```
* `Property（DOM属性）`：HTML元素在JavaScript中的表现形式； 动态的 元素的实时状态 通过JS读取或修改：   
    ```js
      const input = document.getElementById("myInput");
      console.log(input.value); // 通过 Property 获取当前值
    ```
* 例子：
    ```html
      <input type="text" value="hello" id="myInput">
    ```
    ```js
      const input = document.getElementById("myInput");
      console.log(input.getAttribute("value")); // hello
      input.value = "world"; // 输入框也变
      console.log(input.value); // world
      console.log(input.getAttribute("value")); // 仍然hello
    ```
* `初始同步`：HTML加载时 Attribute 的值会初始化 Property 的值
* `不同步`：修改 Property 的值不会影响 Attribute 的值；修改Attribute的值不会更新Property的值
* `可以手动更新`：
    ```js
      const input = document.getElementById("myInput");
      input.setAttribute("value",input.value); // 同步 Property 到 Attribute
    ```
* 修改 `Property` 时 直接操作了`DOM对象`的实时状态 并非和`Attribute`同步（如例子中：更新了输入框中显示的值）
---
## localStorage 与 sessionStorage
`localStorage`和`sessionStorage`是`HTML5`提供的对于`Web存储`的解决方案（`HTML5` 标准的 `Web Storage API`） | 这二者均与HTTP无关 是HTML5提供的标准 所以：
- 发起`HTTP请求`时不像`cookie`一样自动携带 | 完全在浏览器端 适合纯前端逻辑数据存储
- 数据以 `key-value`（字符串） 形式存储，存进去时会被隐式转换成 `string`
- 每个域容量不一样 大约5M
- 不同点：
  - `localStorage`用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的
  - `SessionStorage`会在用户关闭浏览器后，即会话结束后，数据失效
  - `SessionStorage`与服务端`Session`无关
- Cookie 与它们的联系：
  - Cookie 是 HTTP 协议的状态管理机制，最初是为了让无状态的 HTTP 记住客户端信息
  - 但是浏览器提供了 `JS API` 来操作 `Cookie` :
    ```
    document.cookie = "username=xxx; max-age=3600";
    ```
  - `JS` 设置的 `Cookie` 默认就是客户端自己能读/写的（除非服务端设置了 `HttpOnly` 标记 → 前端不可读）
  - 服务端设置的 `Cookie` 常用于认证（比如 `Set-Cookie: session_id=xxx; HttpOnly; Secure`），浏览器会在后续请求里自动带上
  - [记住用户名的登录表单 + Cookie](../static/3HTML/cookie.html)
  - [搜索历史记录 + LocalStorage](../static/3HTML/localStorage.html)
---
## Web Worker
- 在浏览器里：
  - JS 是单线程的，默认和 UI 渲染、公用的事件循环在同一个主线程上执行。
  - 如果某个 JS 运算（比如大循环、复杂计算）执行时间很长，就会阻塞 UI，页面就会「卡死」。
- 👉 为了避免这种情况，`HTML5` 引入了 `Web Worker`，让你可以开一个**后台线程**来执行任务，**和主线程并行**，不会阻塞 UI。
  - `Worker` 没有权限访问 `DOM`、`window` 对象。
  - 但是有 `self`，它指向 `Worker` 的全局作用域。
  - 主线程和 `Worker` 之间通过消息传递机制（`postMessage` + `onmessage`）进行通信，数据会被拷贝（`Structured Clone`），不是直接共享。
  - `Worker` 的执行环境很精简：有 `setTimeout`、`fetch`、`XMLHttpRequest` 等，但没有直接操作 `DOM` 的能力。
- 【补充】`self`
- **在浏览器环境里**：
  - self 是一个全局对象的属性。
  - 它和 window 指向的是同一个对象。
  - `console.log(self === window); // true`
- **在 `Web Worker` 环境里**：
  - Worker 里面没有 window，但有 self，它指向当前 worker 的全局上下文。
  - 所以在 worker 里常见：
  ```js
    self.onmessage = function(e) {
      console.log('Worker 收到消息：', e.data);
    };
  ```
- **在 `Node.js` 里**（`ES2020` 开始）：
  - `self` 也存在，和 `globalThis` 指向同一个对象。
---
## DOM的类层级关系
- 在`W3C DOM 规范`里，所有 `DOM节点` 都是从 `Node` 这个抽象基类继承来的
- 之后不同类型的节点会有更具体的类
```
Node (抽象基类)
 ├── Document (文档节点)
 │     └── HTMLDocument (HTML文档，浏览器里的 document)
 │
 ├── Element (元素节点)
 │     ├── HTMLElement
 │     │     ├── HTMLDivElement (<div>)
 │     │     ├── HTMLParagraphElement (<p>)
 │     │     └── …其他HTML元素
 │     └── SVGElement (<svg> 等)
 │
 ├── Text (#text)
 ├── Comment (<!--注释-->)
 ├── DocumentFragment (#document-fragment)
 └── DocumentType (<!DOCTYPE html>)
```
- 1️⃣ 所有节点（不管是元素、文本、注释、文档…）都继承自 Node，因此它们都有 nodeType、nodeName、parentNode 这些属性。 `👉 可以说它们“继承自 Node”。`

- 2️⃣ 某个具体对象，比如 document，它的构造函数是 HTMLDocument（继承自 Document → Node）。 `👉 所以 document 是 HTMLDocument 的实例，同时也是 Document 的实例，更进一步也是 Node 的实例。`