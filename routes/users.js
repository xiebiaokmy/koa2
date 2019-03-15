const router = require('koa-router')()
const {
  register,
  checkUser,
  login
} = require('../service/user')
router.prefix('/user')


router.post('/checkUser', async function (ctx, next) {    
  const data  = await checkUser({
    username:ctx.request.body.username
  })  
  ctx.body = data  
})
router.post('/register', async function (ctx, next) {  
  const insertData = ctx.request.body
  delete insertData.token;
  ctx.body = await register(insertData)
})

router.post('/login', async function (ctx, next) {  
  ctx.body = await login({
    username:ctx.request.body.username,
    password:ctx.request.body.password,
  })
  
})
module.exports = router
