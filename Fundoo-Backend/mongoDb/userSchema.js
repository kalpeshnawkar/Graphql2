const mongoose = require('mongoose')
var schema = mongoose.Schema;
var userSchema = new schema({
    firstName: {
        type: String,
        minlength:[3,"length of firstName must be atleast 3 character long"],
        maxlength:[200,"maximun length of firstName is 200"],
        require: true

    },
    lastName: {
        type: String,
        minlength:[3,"length of lastName must be atleast 3 characters long"],
        maxlength:[200,"maximun length of lastName is 200"],
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        minlength:[8,"length of password must be atleast 8 characters long"],
        require: true
    },
    isVerify:
    {
        type: Boolean,
        default: false
    },
    gitid:{
        type:String,
        require:true
    },
    gitToken:{
        type:String,
        require:true
    },
    setProfile:{
        type:String
    }
    

    
}, {
        timestamp: true
    })

module.exports = mongoose.model('user', userSchema)