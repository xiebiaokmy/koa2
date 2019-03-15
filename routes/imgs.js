const router = require('koa-router')()
router.prefix('/imgs')

const multer = require('koa-multer');//加载koa-multer模块

var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'),async (ctx, next) => {
    console.log(1111,ctx.req.body.type)
   ctx.body = {
       code:200,
       filename: ctx.req.file.filename,//返回文件名
       msg:"上传图片",
   } 
})



module.exports = router