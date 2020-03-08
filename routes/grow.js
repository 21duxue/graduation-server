const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
  await ctx.render('grow', {
      HTTP_ROOT: ctx.config.HTTP_ROOT,
      errmsg: ctx.query.errmsg,
      obj:data
    });
  })
module.exports=router.routes();
