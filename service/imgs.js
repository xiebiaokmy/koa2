const {
    createImg,   
} = require("../dao/database")
module.exports.create = async (insetData)=>{
    const data = createImg({
        modelName:"imgs",
        insetData
    })
    console.log(3333,data)
    return data
}