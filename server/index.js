const path = require("path");
const Koa = require("koa");
const app = new Koa();

// set 静态资源路径
const staticPath = require("koa-static");
app.use(staticPath(path.join(__dirname, "../dist")));

// body parser  解析路由参数
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = err.message || "Server Error 2000";
  }
});

const { renderToString } = require("./render");
app.use(async (ctx, next) => {
  try {
    // 匹配非静态资源非接口的get请求 渲染页面
    if (ctx.method == "GET" && !ctx.href.includes("api")) {
      const html = await renderToString(ctx);
      ctx.body = html;
    } else {
      next();
    }
  } catch (error) {
    if (error.code && error.code == 404) {
      ctx.redirect("/404.html");
    } else {
      // 若SSR渲染出错， 退回到客户端渲染 首页
      ctx.redirect("/index.html");
    }
  }
});

// 加载 koa-router
const router = require("./route");
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("http://localhost:3000/");
});
