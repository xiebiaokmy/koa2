const router = require('koa-router')()
const {
    create,    
  } = require("../service/imgs")
const {
    addImg
} = require("../service/movies")
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
    // console.log(1111,ctx.req.body.type,ctx.req.body)
    ctx.req.body.url = "http://localhost:3000/uploads/"+ctx.req.file.filename
    const data = await create(ctx.req.body)
    const res = await addImg(data)
    console.log(444,data)
    
    if(res){
        ctx.body = {
            code:200,
            msg:"新增图片成功",
            data:data
        }
    }else{
        ctx.body = {
            code:2002,
            msg:"出现未知的错误"
        }
    }
})



module.exports = router