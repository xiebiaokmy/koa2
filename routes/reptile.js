const router = require('koa-router')()
const {
  find
}= require("../service/reptile")
router.prefix('/reptile')
router.post('/getInfo', async function (ctx, next) {  
  const data  = await find({}) 
  ctx.body = {
    code:200,
    msg:"查询成功",
    data:data
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
