const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
  await ctx.render('welcome', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg,
    obj:{}
  });
});


module.exports=router.routes();
