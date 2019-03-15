var mongoose = require("mongoose")
var {
    Schema
} = mongoose
var movieSchema = new Schema({
    cName:String,
    eName:String,
    movieType:String,
    country:String,//制片国家
    duration:String,//时长
    release:String,//上映时间
    status: String,//电影状态1热映2可观看3即将上映4下映
    synopsis:String,//电影简介
    director:[],//导演
    actors:[],//演员
    imgs:{
        type:Schema.Types.ObjectId,
        ref:"imgs"
    }
})
mongoose.model("movies",movieSchema,"movies")
