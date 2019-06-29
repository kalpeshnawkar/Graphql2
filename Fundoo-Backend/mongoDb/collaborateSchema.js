const mongoose=require('mongoose');
var collaborateSchema=new mongoose.Schema({
    collaborateID:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"userSchema"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userSchema"
    },
    noteID:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"noteSchema"
    }
},{
    timestamp:true
        
    }
)
module.exports=mongoose.model('collaborate',collaborateSchema)