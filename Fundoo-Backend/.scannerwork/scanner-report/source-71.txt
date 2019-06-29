const mongoose=require('mongoose');
var issueSchema=new mongoose.Schema({
    issueID:{
        type:String,
        require:true
    },
    gitID:{
        type:String,
        require:true

    },
    labelID:[{
        type:String,
        require:true
    }],
    comments:[{
        type:String
    }]


},{
    timestamp:true
        
    }
)
module.exports =mongoose.model('issue',issueSchema)
