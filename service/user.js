const {
    create,
    query
} = require('../dao/database')

module.exports.register = async (insetData)=>{
    const data =  await create({
        modelName:"user",
        insetData
    })
    let code = ""
    let msg = ""
    if(data){
        code = 200
        msg = "注册成功"
    }else{
        code = 2002 //未知错误
        msg = "出现未知错误"
    }   
    return {
        data,
        code,
        msg
    }
}
module.exports.checkUser = async (queryTerms)=>{
    const data = await query({
        modelName:"user",
        queryTerms
    })
    let code = ""
    let msg = ""
    if(data.count == 0){
        code = 200,
        msg = "账号可注册"
    }else{
        code = 2001//"账号已存在"
        msg = "账号已存在"
    }
    return {        
        code,
        msg
    }
}
module.exports.login = async (queryTerms)=>{
    const data = await query({
        modelName:"user",
        queryTerms
    })
    console.log(data)
    let code = ""
    let msg = ""
    if(data.count !=0 ){
        code = 200,
        msg = "登录成功"
    }else{
        code = 2003//"账号或密码错误"
        msg = "账号或密码错误"
    }
    return {        
        code,
        msg
    }
}