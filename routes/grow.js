const Router=require('koa-router');
const db=require('../lib/database');

let router=new Router();

router.get('/', async ctx=>{
    console.log(db.query("SELECT * FROM Grow;"))
    await ctx.render('grow', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg,
    obj:db.query("SELECT * FROM Grow;")
  });
});


module.exports=router.routes();
