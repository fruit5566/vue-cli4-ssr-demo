const Router = require("koa-router");
const router = new Router();

router.post("/hello", async ctx => {
  ctx.body = "hello";
});
router.get("/sss", async ctx => {
  ctx.body = "hello";
});

module.exports = router;
