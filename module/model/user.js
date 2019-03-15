var mongoose = require("mongoose")
var {
    Schema
} = mongoose
var userSchema = new Schema({
    username:String,
    password:String,
    email:String
})
mongoose.model("user",userSchema,"user")