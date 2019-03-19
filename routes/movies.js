const router = require('koa-router')()
const {
  create,
  query,
  update,
  remove,
  queryDetail
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
router.post('/remove', async function (ctx, next) {  
  const queryTerms = ctx.request.body
  delete queryTerms.token  
  const data  = await remove(queryTerms) 
  ctx.body = data
})

router.post('/hotList', async function (ctx, next) {    
  const data  = await query({
    curPage:1,
    eachPage:100, 
    queryTerms:{
        fuzzySearchValue:"",
        fuzzyStatusValue:"1"
    }           
}) 
  ctx.body = data
})
router.post('/commingSoonList', async function (ctx, next) {    
  const data  = await query({
    curPage:1,
    eachPage:100, 
    queryTerms:{
        fuzzySearchValue:"",
        fuzzyStatusValue:"3"
    }           
}) 
  ctx.body = data
})
router.post('/historyList', async function (ctx, next) {    
  const data  = await query({
    curPage:1,
    eachPage:100, 
    queryTerms:{
        fuzzySearchValue:"",
        fuzzyStatusValue:"2"
    }           
}) 
  ctx.body = data
})
router.post('/detail', async function (ctx, next) {  
  const data  = await queryDetail({
    curPage:1,
    eachPage:100, 
    _id:ctx.request.body._id,
    queryTerms:{
        fuzzySearchValue:"",
        fuzzyStatusValue:""
    }           
}) 
  ctx.body = data
})
module.exports = router