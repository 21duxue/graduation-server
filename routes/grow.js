const Router=require('koa-router');
const db=require('../lib/database');

let router=new Router();

router.get('/', async ctx=>{
    db.query("SELECT * FROM Grow;",((err,res)=>{
      if(err){
        console.log(err)
      }else{
        await ctx.render('grow', {
          HTTP_ROOT: ctx.config.HTTP_ROOT,
          errmsg: ctx.query.errmsg,
          obj:res
        });
      }
    }))
    
});


module.exports=router.routes();
