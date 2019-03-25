//nodejs里一个非常方便的客户端请求代理模块
const superagent = require('superagent');   
const cheerio = require('cheerio')//Node.js 版的jQuery
const {
    create,
    query,
    update,
} = require("../dao/database")
// const async = require('async');  
// const fs = require('fs');
// const url = require('url')
// const targetUrl = "http://58921.com/alltime"
// const targetUrl = "http://www.films.cn/boxoffice"
const targetUrl = "http://58921.com/"
module.exports.find = async (queryTerms,fn)=>{
    return new Promise((resove,reject)=>{
        new Promise(async (resove1,reject1)=>{
            const queryData = await query({
                modelName:"data", 
                queryTerms       
            })        
            resove1(queryData)
        }).then((queryData)=>{
            getInfo().then((res)=>{
                new Promise(async (resove2,reject2)=>{
                    if(queryData.count==1){
                        await update({
                            modelName:"data", 
                            updateTerms:{_id:queryData.data[0]._id},
                            updateData:res
                        })
                        resove2(true)
                    }else{
                        await create({
                            modelName:"data", 
                            insetData:res
                        })
                        resove2(true)
                    }
                }).then(async (data1)=>{
                    const res = await query({
                        modelName:"data",
                        queryTerms
                    })
                    resove(res)
                })            
            })        
        })
    })       
           
}
function getInfo(){
    return new Promise((resove,reject)=>{
        superagent
        .get(targetUrl)
        .end((err,res)=>{
            var $ = cheerio.load(res.text);        
            var dom = $(".table-condensed").eq(3).find("tbody tr")
            var dom1 = $(".table-condensed").eq(0).find("tbody tr")
            resove({
                realTimeData:renderRealtimeData(dom1,$),
                historyData:renderData(dom,$)
            })
        })
    })    
}
//渲染历史数据
function renderData(dom,$){
    var data = []
    dom.each(function(item){
        data[item] = {
            name:"",
            value:""
        }
        $(this).find("td").each(function(each){
            if(each ==0){
                data[item].name = $(this).text()
            }else{
                data[item].value = $(this).text()
            }
        })
    })
    return data
}
function renderRealtimeData(dom,$){
    var data = []
    dom.each(function(item){
        data[item] = {
            name:"",
            shipFormation:"",
            personTime:"",
            advanceSale:"",
            cumulative:""
        }
        $(this).find("td").each(function(each){
            switch(each)
            {
            case 0:
            data[item].name = $(this).text()
            break;
            case 1:
            data[item].shipFormation = $(this).text()
            break;
            case 2:
            data[item].personTime = $(this).text()
            break;
            case 3:
            data[item].advanceSale = $(this).text()
            break;
            case 4:
            data[item].cumulative = $(this).text()
            break;
            }            
        })
    })
    return data
}
