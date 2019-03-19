const {
    create,
    query,
    update,
    remove
} = require("../dao/database")
module.exports.create = async (insetData)=>{
    const data = await create({
        modelName:"movies",
        insetData
    })
    if(data){
        return {
            code:200,
            msg:"新增电影成功"
        }
    }else{
        return {
            code:2002,
            msg:"出现未知的错误"
        }
    }
}
module.exports.query = async (queryData)=>{
    let eachPage = parseInt(queryData.eachPage) 
    let curPage = parseInt(queryData.curPage) 
    let isFuzzy = false//是否模糊查询
    let fuzzyField = {//模糊字段
        cName:"",
        eName:""
    }
    let queryTerms = {

    }
    if(queryData.queryTerms.fuzzySearchValue){
        isFuzzy = true
        fuzzyField = {
            cName:queryData.queryTerms.fuzzySearchValue,
            eName:queryData.queryTerms.fuzzySearchValue
        }
    }
    if(queryData.queryTerms.fuzzyStatusValue && queryData.queryTerms.fuzzyStatusValue != "0"){
        queryTerms.status = queryData.queryTerms.fuzzyStatusValue
    }
    const data = await query({
        modelName:"movies",
        populate: [{
			path: "imgs"
		}],
        queryTerms,
        eachPage,
        curPage,
        isFuzzy,
        fuzzyField
    })
    if(data){
        return {
            code:200,
            msg:"查询成功",
            data:data
        }
    }else{
        return{
            code:2002,
            msg:"出现未知的错误"
        }
    }
}
module.exports.update = async(updateData)=>{
    const data = await update({
        modelName:"movies",
        updateTerms:{
            _id:updateData.edit_id
        },
        updateData:updateData.editForm
    })
    if(data){
        return {
            code:200,
            msg:"修改成功",
            data:data
        }
    }else{
        return{
            code:2002,
            msg:"出现未知的错误"
        }
    }
}

module.exports.addImg = async(updateData)=>{
    const data = await update({
        modelName:"movies",
        updateTerms:{
            _id:updateData.movieId
        },
        updateData: {
			$push: {
				imgs: updateData._id
			}
		}
    })
    if(data){
        return {
            code:200,
            msg:"修改成功",
            data:data
        }
    }else{
        return{
            code:2002,
            msg:"出现未知的错误"
        }
    }
}
module.exports.remove = async (queryTerms)=>{
    const data = remove({
        modelName:"movies",
        queryTerms
    })
    if(data){
        return {
            code:200,
            msg:"删除电影成功",
            data:data
        }
    }else{
        return{
            code:2002,
            msg:"出现未知的错误"
        }
    }
}
module.exports.queryDetail = async (queryData)=>{
    let eachPage = parseInt(queryData.eachPage) 
    let curPage = parseInt(queryData.curPage) 
    let isFuzzy = false//是否模糊查询
    let fuzzyField = {//模糊字段
        cName:"",
        eName:""
    }
    let queryTerms = {
        _id:queryData._id
    }
    if(queryData.queryTerms.fuzzySearchValue){
        isFuzzy = true
        fuzzyField = {
            cName:queryData.queryTerms.fuzzySearchValue,
            eName:queryData.queryTerms.fuzzySearchValue
        }
    }
    if(queryData.queryTerms.fuzzyStatusValue && queryData.queryTerms.fuzzyStatusValue != "0"){
        queryTerms.status = queryData.queryTerms.fuzzyStatusValue
    }
    const data = await query({
        modelName:"movies",
        populate: [{
			path: "imgs"
		}],
        queryTerms,
        eachPage,
        curPage,
        isFuzzy,
        fuzzyField
    })
    if(data){
        return {
            code:200,
            msg:"查询成功",
            data:data
        }
    }else{
        return{
            code:2002,
            msg:"出现未知的错误"
        }
    }
}