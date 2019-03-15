const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Create a new MongoClient


// Use connect method to connect to the Server


class Db {
    static(){

    }
    constructor(){
        // this.connect()
    }
    connect(){
       return new Promise((resove,reject)=>{
            // const client = new MongoClient(url);
            // const db = client.db(dbName);
            // resove(db) 
            MongoClient.connect(url,(err,client)=>{
                if(err){
                    reject(err)
                    return
                }
                const db = client.db(dbName);
                resove(db) 
            })
        })        
    }
    find(collectionName,json){
        return new Promise((resove,reject)=>{
            this.connect().then((db)=>{
                const collection = db.collection(collectionName);
                let res = collection.find(json)
                res.toArray(function(err,data){
                    if(err){
                        reject(err)
                        return
                    }
                    console.log(data)
                    resove(data)
                })  
            })
        })
    }
    insert(collectionName){    
        return new Promise((resove,reject)=>{
            this.connect().then((db)=>{
                const collection = db.collection(collectionName);
                collection.insertOne({
                    name:"测试2",
                    age:66,
                    sex:"男"
                },function(err,data){
                    if(err){
                        reject(err)
                        return
                    }
                    console.log("新增用户成功")
                    resove("新增用户成功") 
                })
            })
        })      
    }
    updata(){

    }    
    remove(){

    }
}
let userDb = new Db
console.time("11")
userDb.find("user",{name:"测试2"})
console.timeEnd("11")