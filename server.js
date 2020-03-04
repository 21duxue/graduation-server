const Koa = require('koa');
const Router = require('koa-router');
const static = require('./static/');
const path = require('path');
const body = require('koa-better-body');


//中间件
server.use(body({
	uploadDir:path.resolve(__dirname,'static/upload')
}))

let server = new Koa();
server.listen (8080)

let router = new Router();
static(router)
router.use('/',require('./routes/www'))
router.use('/admin',require('./routes/admin'))


server.use(router.routes())