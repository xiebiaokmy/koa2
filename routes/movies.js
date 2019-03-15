const router = require('koa-router')()
const {
  create,
  query,
  update
} = require("../service/movies")

router.prefix('/movies')


router.post('/addMovies', async function (ctx, next) {    
  const data  = await create(ctx.request.body) 
  ctx.body = data
})

router.post('/list', async function (ctx, next) {  
  const queryTerms = ctx.request.body
  delete queryTerms.token
  const data  = await query(ctx.request.body) 
  ctx.body = data
})
router.post('/edit', async function (ctx, next) {  
  const updataData = ctx.request.body
  delete updataData.token  
  const data  = await update(ctx.request.body) 
  ctx.body = data
})
module.exports = router