const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("连接数据库成功")
//   let kittySchema  = new mongoose.Schema({
//       name:String
//   })
//   kittySchema.methods.speak = function(){
//       let greeting = this.name?"Meow name is"+this.name:"I do not hav a name"
//       console.log(greeting)
//   }
//   let Kitten = mongoose.model("Kittens",kittySchema)
//   let silence = new Kitten({
//       name:"Silence"
//   })
//   silence.save((err,silence)=>{
//     if(err) return console.log(err)
//     silence.speak()
//   })
//   Kitten.find((err,Kittens)=>{
//     if(err) return console.log(err)
//     console.log(Kittens)
//   })
    // let blogSchema = new mongoose.Schema({
    //     title:String,
    //     author:String,
    //     body:String,
    //     commets:[{
    //         body:String,
    //         date:Date
    //     }],
    //     hidden:Boolean,
    //     meta:{
    //         votes:Number,
    //         fava:Number
    //     }
    // })
    // var Blog = mongoose.model("Blogs",blogSchema)


    const Schema = mongoose.Schema
//     const personSchema = Schema({
//         _id:Schema.Types.ObjectId,
//         name:String,
//         age:Number,
//         stories:[{
//             type:Schema.Types.ObjectId,
//             ref:"Story"
//         }]
//     })
//     const storySchema = Schema({
//         author:{
//             type:Schema.Types.ObjectId,
//             ref:"Person"
//         },
//         title:String,
//         fans:[{
//             type:Schema.Types.ObjectId,
//             ref:"Person"
//         }]
//     })
//     const Story = mongoose.model('story', storySchema,"story");//第一个参数 表的名字，最后一个参数如果省略不写数据库自动将表名加复数，这里不写的话数据库表明为“stories”会出问题
//     const Person = mongoose.model('person', personSchema,'person');
//     const author = new Person({
//         _id:new mongoose.Types.ObjectId(),
//         name:"张三",
//         age:50
//     })
//     author.save(function(err){
//         if(err) return 
//         const story1 = new Story({
//             author:author._id,
//             title:"小蝌蚪找妈妈"
//         })
//         story1.save(function(error){
//             if(error) return

//         })
//     })
//     Story.findOne({title:"小蝌蚪找妈妈"})
//         .populate("author")
//         .exec(function(err,story1){
//             if(err) return
//             console.log(story1)
//         })
//     mongoose.model("story")
//             .count()
//             .exec((err, data) => {
//                 if (err) console.log(err)
//                 else console.log(data)
//             })   
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
var imgSchema = new Schema({
    url:String,
    type:String,
    urlName:String,
    status:String,
    movieId:{
        type:Schema.Types.ObjectId,
        ref:"movies"
    }
})
mongoose.model("imgs",imgSchema,"imgs")
const movies = mongoose.model('movies', movieSchema,"movies");
console.log(111)
movies.find({_id:"5c8f4d89064aaf42b8c51250"})
        .populate("imgs")
        .exec(function(err,story1){
            console.log(3333)
            if(err){
                console.log(err)
            }else{
                console.log(1111,story1)
            }
})
console.log(222)
});
