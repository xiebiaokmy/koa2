
var mongoose = require('mongoose');
require("../module/model/user")
//引入mongodb模块，获得客户端对象
var dbURI = 'mongodb://localhost/test';
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
/*
 * [description]
 * @param  {[type]}   options.modelName  [description]  model 名称
 * @param  {[type]}   options.queryTerms [description]  查询条件
 * @param  {Object}   options.sort       [description]  排序方式 1 为升序 -1 为降序
 * @param  {Number}   curPage            [description]  当前页
 * @param  {Number}   eachPage           [description]  每页显示条数
 * @param  {[type]}   populate}         [description]   关联字段
 * @param  {Function} callback           [description]  
 * @return {[type]}                      [description]
 */



// //查询数据
module.exports.query = async({
    modelName,
    curPage = 1,
    eachPage,
    sort = {
        _id: 1
    },
    populate,
    maxPage,
    queryTerms,
}) => {
    // console.log(modelName);
    // console.log(queryTerms)
    const page = {};
    page.curPage = curPage;
    page.eachPage = eachPage;
    page.count = await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .count(queryTerms)
            .exec((err, data) => {
                if (err) console.log(err)
                else resolve(data)
            })
    })
    page.maxPage = Math.ceil(page.count / page.eachPage)

    page.data = await new Promise((resolve, reject) => {
        const model = mongoose
            .model(modelName)
            .find(queryTerms)
        if (populate) {
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

    return page
}



// 增加数据
module.exports.create = async({
    modelName,
    insertData,
}) => {
    // console.log('这是database')
    // console.log(modelName)
    // console.log(insertData)
    return await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .create(insertData, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(data)
                }
            })
    })
}



// 删除数据
module.exports.remove = async({
    modelName,
    queryTerms
}) => {
    return await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .remove(queryTerms, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(data)
                }
            })
    })
}



//修改数据
module.exports.update = async({
    modelName,
    queryTerms,
    updateData
}) => {
    return await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .update(queryTerms, updateData, (err, data) => {
                console.log(data)
                if (err) console.log(err)
                else resolve(data)
            })
    })
}


//排片关联分组查询--注意easyui的datagrid需要返回的数据是{total:“一共多少条”,rows:"具体的数据data"}
module.exports.groupBy = async({
    modelName, //'schedule' 模板名称
    match, //movieId:ObjectId(movieId) 筛选movieId:是这么多的集合反回出来
    group
    // _id:"$studioId"  把这些ID组合起返回出来
}) => {
    const data = await new Promise((resolve, reject) => {
        mongoose
            .model(modelName)
            .aggregate()
            .match(match) //group之前的match对数据源进行查询，group之后的match对数据进行筛选
            .group(group) //只返回按照指定的表达式进行分组 同时这里也有去重的效果
            .exec((err, data) => {
                if (err) console.log(err)
                else resolve(data)
            })
    })

    return data
}