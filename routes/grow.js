const Router=require('koa-router');
const Grow = require('../module/Grow');

let router=new Router();

router.get('/', async ctx=>{

  let query = JSON.stringify(ctx.query)
  newQuery = JSON.parse(query);
  if(newQuery.id){
    ctx.body=ctx.query
  }else{
    await ctx.render('article-list', {
      HTTP_ROOT: ctx.config.HTTP_ROOT,
      errmsg: ctx.query.errmsg,
      obj:{}
    });
  }
})
  
module.exports=router.routes();
