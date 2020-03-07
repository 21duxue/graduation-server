const Router=require('koa-router');

let router=new Router();

router.get('/', async ctx=>{
    console.log(ctx.db.query("SELECT * FROM Grow;"))
    await  ctx.render('grow', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg,
    obj:ctx.db.query("SELECT * FROM Grow;")
  });
});


module.exports=router.routes();
