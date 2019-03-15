var mongoose = require("mongoose")
var Schema = mongoose.Schema
var imgSchema = new Schema({
    url:String,
    type:String,
    status:String,
    movieId:{
        type:Schema.Types.ObjectId,
        ref:"movies"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
})
mongoose.model("imgs",imgSchema,"imgs")