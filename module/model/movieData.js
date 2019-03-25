var mongoose = require("mongoose")
var Schema = mongoose.Schema
var dataSchema = new Schema({
    realTimeData:[],
    historyData:[]
})
mongoose.model("data",dataSchema,"data")