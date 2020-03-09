const Router=require('koa-router');
const body=require('koa-better-body');

const grow = require('../module/Grow');
let Grow = new grow()
let router=new Router();

function parsePostData( ctx ) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end",function(){
        let parseData = parseQueryStr( postdata )
        resolve( parseData )
      })
    } catch ( err ) {
      reject(err)
    }
  })
}

// 将POST请求参数字符串解析成JSON
function parseQueryStr( queryStr ) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log( queryStrList )
  for (  let [ index, queryStr ] of queryStrList.entries()  ) {
    let itemList = queryStr.split('=')
    queryData[ itemList[0] ] = decodeURIComponent(itemList[1])
  }
  return queryData
}

router.get('/', async ctx=>{
  let query = JSON.stringify(ctx.query)
  newQuery = JSON.parse(query);
  if(newQuery.id){
    ctx.body=ctx.query
  }else{
    let result = {}
   await new Promise(function(reject,resolve){
      Grow.getAll((error,res)=>{
        res = JSON.stringify(res);
        res = JSON.parse(res);
        if (error) throw error;
        result = res
        reject(res);
      })
    })
    await ctx.render('article-list', {
      HTTP_ROOT: ctx.config.HTTP_ROOT,
      errmsg: ctx.query.errmsg,
      obj:result
    });
  }
})

router.get('/delete', async ctx=>{
  let query = JSON.stringify(ctx.query)
  newQuery = JSON.parse(query);
  if(newQuery.id){
    let result = [];
    await new Promise(function(reject,resolve){
      Grow.deleteItem(newQuery.id,(error,res)=>{
        res = JSON.stringify(res);
        res = JSON.parse(res);
        if (error) throw error;
        result = res
        reject(res);
     })
    })
    ctx.body = '已删除'
  }
})


router.get('/get-list', async ctx=>{
  let query = JSON.stringify(ctx.query)
  newQuery = JSON.parse(query);
  if(newQuery.id){
    let result = [];
    await new Promise(function(reject,resolve){
      Grow.selectGrow(newQuery.id,(error,res)=>{
        res = JSON.stringify(res);
        res = JSON.parse(res);
        if (error) throw error;
        result = res
        reject(res);
     })
    })
    ctx.body = result
  }
})

router.post('/', async ctx=>{
  let data = ctx.request.fields;
  console.log(data)
    await ctx.render('article-list', {
      HTTP_ROOT: ctx.config.HTTP_ROOT,
      errmsg: ctx.query.errmsg,
      obj:[]
    });
})


  
module.exports=router.routes();
