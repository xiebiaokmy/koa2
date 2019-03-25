var mongoose = require('mongoose');
require("../module/model/user")
require("../module/model/movies")
require("../module/model/imgs")
require("../module/model/movieData")
//引入mongodb模块，获得客户端对象
var dbURI = 'mongodb://localhost/test';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
//查询的方法
module.exports.query = async({
    modelName,//需要操作的表名
    queryTerms,//查询条件
    eachPage = 10,//每页显示条数
    curPage = 1,//当前页
    sort = {//排序方式1为升序，-1为降序
        _id:1
    },
    populate,//关联表   
    isFuzzy,//是否模糊查询
    fuzzyField,//模糊查询的字段
})=>{   
    let data = {}    
    let arr = []
    if(isFuzzy){
        for (let item in fuzzyField) {
            if(item){
                var reg = fuzzyField[item]
                var re =new RegExp(reg); // re为/^\d+bl$/gim
                let obj = {

                }
                obj[item] = re
                arr.push(obj)
            }
        }
    }    
    data.count = await new Promise((resolve,reject)=>{
        if(arr.length){
            mongoose
            .model(modelName)
            .find(Object.assign(queryTerms,{$or: arr}))
            .count()
            .exec((err,res)=>{
                if(err) reject(err) 
                resolve(res)
            })
        }else{
            mongoose
            .model(modelName)
            .find(queryTerms)
            .count()
            .exec((err,res)=>{
                if(err) reject(err) 
                resolve(res)
            })
        }        
    })
    data.data = await new Promise((resolve,reject)=>{
        let model = null
        if(arr.length){
            model = mongoose.model(modelName).find(Object.assign(queryTerms,{$or: arr}))
        }else{
            model = mongoose.model(modelName).find(queryTerms)
        }
        if(populate){
            for (let item of populate) {
                model.populate(item)
            }
        }
        model
            .sort(sort)
            .skip((curPage - 1) * eachPage)
            .limit(eachPage)
            .exec((err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(data)
                }
            })
    })
    return data
}
//新增方法
module.exports.create = async({
    modelName,
    insetData,    
})=>{
    return await new Promise((resolve,reject)=>{
        mongoose
        .model(modelName)
        .create(insetData,(err,data)=>{
            if(err) {
                resolve(false)
            }else{
                resolve(true)
            } 
        })
    })
}
//修改方法
module.exports.update = async ({
    modelName,
    updateTerms,
    updateData
})=>{
    return new Promise((resolve,reject)=>{
        mongoose
        .model(modelName)
        .update(updateTerms,updateData,(err,data)=>{
            if(err) {
                resolve(false)
            }else{
                resolve(true)
            } 
        })
    })
}   
//新增图片的方法
module.exports.createImg = async({
    modelName,
    insetData,    
})=>{
    return await new Promise((resolve,reject)=>{
        mongoose
        .model(modelName)
        .create(insetData,(err,data)=>{
            if(err) {
                resolve(false)
            }else{
                resolve(data)
            } 
        })
    })
}
//删除方法
module.exports.remove = async ({
    modelName,
    queryTerms
})=>{
    return await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .remove(queryTerms, (err, data) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}
