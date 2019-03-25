const koa = require("koa")
const router = require("koa-router")
// koa封装的websocket这是官网（很简单有时间去看一下https://www.npmjs.com/package/koa-websocket）
const websockify = require('koa-websocket')
const app = websockify(new koa())
// app.ws.use(function(ctx, next) {
//     // return `next` to pass the context (ctx) on to the next ws middleware
//     return next(ctx);
// });
let ctxs = [];
app.listen(80);

/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
    ctxs.push(ctx);
    ctx.websocket.on("message", (message) => {
        console.log(message);
        for(let i = 0; i < ctxs.length; i++) {
            if (ctx == ctxs[i]) continue;
            ctxs[i].websocket.send(message);
        }
    });
});