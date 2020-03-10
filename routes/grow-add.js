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

router.post('/', async ctx=>{
  let data = ctx.request.fields;
  var obj = {
    Gid:data.Gid,
    Gtitle:data.Gtitle,
    Rcontent:data.Rcontent[0].path.split('upload/')[1],
    Gimg:data.Gimg[0].path.split('upload/')[1],
  };
  let result = ''
  await new Promise(function(reject,resolve){
    Grow.addGrow(obj,(err,res)=>{
      var html = '<h3 style="font-weight:normal;font-size:16px;text-align:center;margin-top:30px;">'+ (err?'添加失败':'添加成功') + ',请关闭</h3>';
      result = html
      reject(html);
   })
  })
  ctx.body = result;
  // ctx.body = data
})


module.exports=router.routes();
