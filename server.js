const Koa = require('koa');
const Router = require('koa-router');
const static = require('./static/');
const path = require('path');
const body = require('koa-better-body');

let server = new Koa();
//中间件
server.use(body({
	uploadDir:path.resolve(__dirname,'static/upload')
}))

//数据库
server.context.db = require('./lib/database')
server.listen (8080);

// //统一处理
// router.use(async (ctx, next)=>{
// 	try{
// 		await next()
// 	}catch(e){
// 		ctx.state = 500;
// 		ctx.body = 'Internet server error'
// 	}
// })

server.use(async ctx =>{
	let data = await ctx.db.query("SELECT　* FROM Recommend;");
	ctx.body = data;
})

//路由和static
let router = new Router();
static(router)
router.use('/',require('./routes/www'))
router.use('/admin',require('./routes/admin'))


server.use(router.routes())
