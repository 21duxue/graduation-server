const Router=require('koa-router');
const grow = require('../module/Grow');
let Grow = new grow();
let router=new Router();
const multer=require('koa-multer');
const fs=require('fs');
const path=require('path');


//配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
      cb(null, 'public/upload/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
      cb(null,req.body.stuName + "." + fileFormat[fileFormat.length - 1]);
  }
});

//加载配置
var upload = multer({ storage: storage });

router.get('/', async ctx=>{
  await ctx.render('grow-add', {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg
  });
});

router.post('/',upload.single('file'), async ctx=>{
  let data = ctx.request.fields;

  var obj = {
    Gid:data.Gid,
    Gtitle:data.Gtitle,
    Rcontent:data.Rcontent[0].name,
    Gimg:data.Gimg[0].name,
  };
  let result = ''
  await new Promise(function(reject,resolve){
    Grow.addGrow(obj,(err,res)=>{
      console.log(err)
      console.log(res)
      var html = '<h3 style="font-weight:normal;font-size:16px;text-align:center;margin-top:30px;">'+ (err?'添加失败':'添加成功') + ',请关闭</h3>';
      result = html
      reject(html);
   })
  })
  ctx.body = result;
})


module.exports=router.routes();
