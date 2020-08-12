## Vue SSR Demo

- vue-cli4 + ssr + route + vuex store-splitting
- 路由和代码分割，Store 代码拆分 (Store Code Splitting)
- Head 管理 ( title, keyword, description )； 前后端 404
- 若后端渲染失败，返回得到前端渲染

## 主要命令

```
$ npm install
$ npm run serve   # 本地开发-前端渲染模式
$ npm run build  # Window下打包命令
$ npm run dev    # 本地开发，需先build
  ├─ http://localhost:8080  本地 前端渲染
  └──http://localhost:3000  本地 SSR渲染
$ npm run lint # Lint and fix files
```

## 源码结构

```
┌── dist # 静态资源（自动生成）
│   └── vue-ssr-client-manifest.json # 客户端构建 manifest
│   └── vue-ssr-server-bundle.json # 客户端构建 bundle renderer
├── public # 静态目录，打包的时候该目录会原封不动的复制到dist目录下
│   ├── 404.html # 404页面
│   ├── client.template.html # 前端渲染模板
│   └── server.template.html # 后端渲染模板
├── server # koa服务
│   ├── index.js # koa入口
│   ├── render.js # SSR renderToString 封装
│   └── route.js # 服务端路由
├── src # 源码
│   ├── api # 接口
│   │   └── index.js # 接口api
│   ├── assets # 资源
│   │   └── ......
│   ├── route # 前端路由
│   │   └──  index.js
│   ├── store # Vuex store
│   │   └── ......
│   ├── views #  页面/视图
│   │   └── ......
│   ├── app.js # Vue 入口 js
│   ├── App.vue # Vue 入口视图
│   ├── entry-client.ts # 客户端构建入口
│   ├── entry-server.ts # 服务端构建入口
└── .browserslistrc # 浏览器兼容设置
└── .eslintrc.js # eslintrc设置
└── .env.server #  服务端构建模式，提供环境变量
└── package.json # 项目依赖
└── vue.config.js # webpack配置文件
```

## vue.config.js 关键解析

1 关闭 css 分离

```
extract: false,
```

2 关闭 splitChunks

```
chainWebpack: (config) => {
  config.optimization.splitChunks(undefined);
},
```

## Head 管理

SSR 官方文档 Head 管理有点复杂，参考了 vue-meta 的源码实现了 Head 自管理

```
// route/index.js
path: "/index",
meta: {
  title: "Index page title",
  keyword: "Index page keyword",
  description: "Index page description"
},I
```

---

### 前端渲染和后端渲染

> 前后端页面渲染效果表现一致，可以用前端渲染模式 (npm run serve) 进行开发调试。 客户端预取数据采用了 Vue.mixin() 方式。

> 本项目用 vue-cli4 创建项目模板 vue create vue-cli4-ssr-demo。
