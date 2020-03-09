const Router=require('koa-router');
const grow = require('../module/Grow');
let Grow = new grow();
let router=new Router();

router.get('/', async ctx=>{
  await ctx.render('grow-add', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg
  });
});


module.exports=router.routes();
