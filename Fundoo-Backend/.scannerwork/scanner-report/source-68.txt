const mongoose=require('mongoose');
var labelSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"userSchema"
    },
    labelName:{
        type:String,
        require:true

    }
},{
    timestamp:true
        
    }
)
module.exports =mongoose.model('label',labelSchema)