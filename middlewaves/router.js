const Router = require('koa-router');
const { useStore } = require('../store');
const uuidRegExps = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
};
let router = new Router();
router.use(async function(ctx, next) {
  const store = useStore();
  console.log('use store', store);
  await next();
  
})
router.get("/:id", async ctx => {
  const store = useStore();
  console.log('store', store);
  // const ama = await 
  ctx.body = ctx.params.id;
})

module.exports = (app) => {
  app
    .use(router.allowedMethods())
    .use(router.routes());
}