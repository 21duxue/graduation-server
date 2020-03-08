const Router=require('koa-router');
const db=require('../lib/database');

let router=new Router();

router.get('/', async ctx=>{
  db.query("SELECT * FROM Grow;").then(res=>{
    ctx.body = res
  })
  //   ctx.render('grow', {
  //     HTTP_ROOT: ctx.config.HTTP_ROOT,
  //     errmsg: ctx.query.errmsg,
  //     // obj:res
  //   });
  // });
});

module.exports=router.routes();
