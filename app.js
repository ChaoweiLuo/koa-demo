const Koa = require("koa");
const fs = require("fs");
const { randomUUID } = require("crypto");
const { store, useStore } = require('./store');
let app = new Koa();

app.use(async (ctx, next) => {
  if (
    ctx.header["x-forwarded-proto"] &&
    ctx.header["x-forwarded-proto"] != "https"
  ) {
    ctx.redirect(`https://${ctx.host}${ctx.url}`);
  } else await next();
});

app.use(async (ctx, next) => {
  store.enterWith({ id: randomUUID() });
  try {
    await next()
  } catch {}
  finally {
    store.exit(() => console.log('socket done.'))
  }
});


app.use(async (ctx, next) => {
  try {
    const store = useStore();
    store.path = ctx.request.path;
    await next();
  } catch {}
  if (ctx.status === 404) {
    ctx.type = "text/html";
    ctx.body = fs.createReadStream("./index.html");
  }
});

require("./middlewaves/compress")(app);
require("./middlewaves/static")(app);
require("./middlewaves/router")(app);

let port = process.env.PORT || 3009;
app.listen(port, "0.0.0.0", function () {
  console.log("server listen on port:", port);
});
