const userModel = require('../../mongoDb/userSchema')
const labelModel = require('../../mongoDb/labelSchema')
const noteModel = require('../../mongoDb/noteSchema')
const {checkToken}=require("../../middleware/vereifyToken")
const redis=require("async-redis");
const client = redis.createClient({
    host:"localhost",
    port:6379
});
//here defined find() query to fetching  the all data of user
exports.users = async (parent, args) => {
    var user = await userModel.find()

    return user;
}
exports.labels = async (parent, args,context) => {
    var varifiedToken=checkToken(context.token)
 
    
    var redisLabel=await client.get("label"+varifiedToken.id)
    if(redisLabel.length>0){
            var result1 = JSON.parse(redisLabel)
            return result1
    }
    else{
        
        var labels=await labelModel.find({'userID':varifiedToken.id})
        return labels
    }
   
}
exports.notes = async (parent, args,context) => {
    var varifiedToken=checkToken(context.token)
    var note = await noteModel.find({userId:varifiedToken.id})
    return note;
}