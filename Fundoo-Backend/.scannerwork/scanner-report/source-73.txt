const mongoose = require('mongoose')
var noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema"
    },
    labelId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "labelSchema"
    }],
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    remainder:{
        type:Date,
        require:false
    },
    Archives:{
        type:Boolean,
        default:false
    },
    trash:{
        type:Boolean,
        default:false
    }
},
    {
        timeStamp: true
    }
)
module.exports = mongoose.model('note', noteSchema)