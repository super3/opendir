const fs = require("fs").promises;
const Koa = require("koa");
const Router = require("koa-router");
const serve = require('koa-static');
const path = require("path");

const port = process.env.PORT || 8000;
const app = new Koa();

const router = new Router();

router.get('/directories', async ctx => {
  const target = typeof ctx.query.path === "string" ? ctx.query.path : "/";
  const contentDir = await fs.readdir(path.join("./content", target));

  let directories = contentDir.map(async dir => {
    const stats = await fs.lstat(path.join("./content", target, dir));
    if (stats.isFile()) {
      return (dir);
    }
    return `/${dir}`;
  });

  directories = await Promise.all(directories);

  ctx.body = JSON.stringify(directories);
});

app.use(router.routes());
app.use(router.allowedMethods());


app.use(serve('assets'));
app.use(serve('content'));

app.listen(port, () => {
  console.log("Server running on port " + port + "...");
});
