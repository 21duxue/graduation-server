const Koa=require('koa');
const Router=require('koa-router');
const static=require('./routes/static');
const body=require('koa-better-body');
const path=require('path');
const session=require('koa-session');
const fs=require('fs');
const ejs=require('koa-ejs');
const config=require('./config');
const app = require('./routes/app')

let server=new Koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`);

//中间件
server.use(body({
  uploadDir: config.UPLOAD_DIR,
  keepExtensions: 'true' //文件是否需要扩展名
}));


//数据库
server.context.db=require('./lib/database');
server.context.config=config;

//渲染
ejs(server, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});

// server.use(async (ctx, next)=>{
//   let {HTTP_ROOT}=ctx.config;

//   try{
//     await next();

//     if(!ctx.body){
//       await ctx.render('www/404', {
//         HTTP_ROOT
//       });
//     }
//   }catch(e){
//     await ctx.render('www/404', {
//       HTTP_ROOT
//     });
//   }
// });

//路由和static
let router=new Router();

//统一处理
/*router.use(async (ctx, next)=>{
  try{
    await next();
  }catch(e){
    ctx.throw(500, 'Internal Server Error');

    console.log(e);
  }
});*/


// router.get('/',async ctx=>{
//   let data = await ctx.db.query("SELECT * FROM Grow;")
//   ctx.body = data
// })

app(router);
static(router);

server.use(router.routes());
