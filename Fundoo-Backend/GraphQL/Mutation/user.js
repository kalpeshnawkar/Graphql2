const userModel = require('../../mongoDb/userSchema')
const labelModel=require('../../mongoDb/labelSchema')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { sendMailer } = require("../../middleware/sendMailer")
const { checkToken } = require('../../middleware/vereifyToken')
const redis = require('redis');
const client = redis.createClient({
    host:"localhost",
    port:6379,
    no_ready_check: true,
    auth_pass: "redis1234"
});
exports.registration = async (parent, args,context) => {
    //check a RegEx for email Id
    var email = /([A-Za-z0-9])+@([A-Za-z0-9])+.([A-Za-z]{2,4})$/
    if (!email.test(args.email)) {
        return {
            "message": "email not valid",
            "status": false
        }
    }
    //check a RegEx for password
    if (args.password.length < 8) {
        return { 'message': "password length must be atleast 8 charaters long" }
    }
    //defined find() method to check user already exit or not
    var user = await userModel.find({ "email": args.email })
    if (user.length > 0) {
        return { 'message': "email already exit" }
    }

    var newPassword = await bcrypt.hash(args.password, 10)
    var newUser = new userModel({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: newPassword
    })
   var userSaved = await newUser.save()
    //create a token of id
    var token = jwt.sign({ 'id': userSaved._id }, "secreatekey")
    console.log('token in mutattion', token)
    //create url with token
    console.log("context in register",context.origin)
    var url = `${context.origin}?token=${token}`
    console.log("url in mutation", url)
    //if user data save successfull in database
    //then send mail to user ID with url 
    if (userSaved) {
        sendMailer(url, args.email)
        return {
            'message': "plz,check your Email",
            'status': true,
            'token': token
        }
    }
    else {
        return {
            'message': "registration unsuccess",
            'status': true

        }
    }
}
exports.login = async (parent, args) => {
    //check a RegEx for email Id
    var email = /([A-Za-z0-9])+@([A-Za-z0-9])+.([A-Za-z]{2,4})$/
    if (!email.test(args.email)) {
        return {
            "message": "email not valid",
            "status": false
        }
    }
    //check a RegEx for password
    if (args.password.length < 8) {
        return { 'message': "password length must be atleast 8 charaters long" }
    }
    //defined find() method to check user already exit or not
    var user = await userModel.find({ "email": args.email })
    console.log("user  in mutation",user[0]._id)
    if (user.length > 0) {
        //compare password to check password  correct or not
        var comparePassword = await bcrypt.compare(args.password, user[0].password)
        console.log("comparePassword in mutation ", comparePassword)
        //if password is correct then create token of id and send msg with "login successful"
        if (!comparePassword) {
            return {
                'message': "Incorrect Password",
                'status': false
            }
        }
           else if(user[0].isVerify!=true){
            return{
                "message":"please, verify your email"
            }
         
        }
        else{
           var token = jwt.sign({ 'id': user[0]._id }, "secreatekey")
            console.log('token in mutattion', token)
            const savedLabel=await labelModel.find({'userID':user[0]._id})
            console.log("savedLabel",savedLabel)
            client.set("label"+user[0]._id, JSON.stringify(savedLabel))
            // client.get(user[0].id,function(err,result){
            //     if(err) {
            //         console.log(err)
            //     }
            //     else {
            //     console.log('redis is connedcted',result)
            //     }
            //   })
            return {
                'message': "login successfully",
                'status': true,
                'token': token
            }
            
        }
             
    }

    else {
        return {
            'message': "user not Registrated",
            'status': false
        }
    }
}
exports.emailVerify = async (parent, args, context) => {

    var verifiedToken = checkToken(context.token)
    console.log(verifiedToken);


    var verifiedEmail = await userModel.updateOne({ _id: verifiedToken.id }, { $set: { 'isVerify': true } })
    console.log(verifiedEmail);
    if (!verifiedEmail) {
        return { "message": "email not verfied" }
    }
    else {
        return { "message": "email verify successfully" }
    }
}
exports.forgotPassword = async (parent, args,context) => {
    var email = /([A-Za-z0-9])+@([A-Za-z0-9])+.([A-Za-z]{2,4})$/
    if (!email.test(args.email)) {
        return {
            "message": "email not valid",
            "status": false
        }
    }

    var user = await userModel.find({ "email": args.email })
    console.log("user in forgotpassword", user[0].id)
    let token = jwt.sign({ 'id': user[0].id }, 'secreatekey')
    console.log("token in mutation", token)
    console.log("context in forgot ",context.origin)
    let url = `${context.origin}?token=${token}`
    console.log("user in mutation", user.length)
    if (!user.length > 0) {
        return {
            "message": "Invalid Email,plz check your email ID"
        }
    }
    else {
        sendMailer(url, args.email)
        return {
            'message': "plz,check your Email",
            'status': true,
            'token': token
        }
    }

}
exports.resetPassword = async (parent, args, context) => {
    if (args.password.length < 8) {
        return { 'message': "password length must be atleast 8 charaters long" }
    }
    var newPassword = await bcrypt.hash(args.password, 10)
    var verifiedToken = checkToken(context.token)
    let updatedPassword = await userModel.updateOne({ _id: verifiedToken.id }, { $set: { 'password': newPassword } })
    if (!updatedPassword) {
        return {
            'message': 'password not reset',
            'status': false
        }

    }
    else {
        return {
            'message': 'password is reseted',
            'status': true
        }
    }
}
exports.update = async (parent, args, context) => {
    let verifiedToken = checkToken(context.token)
    let updateFirstName = await userModel.update({ _id: verifiedToken.id },
        {
            $set:
            {
                'firstName': args.firstName,
            }
        },
        {
            'new': true
        })
    console.log("updateFirstName in update", updateFirstName)
    if (!updateFirstName) {
        return {
            'message': 'user update not successful'
        }
    }
    else {
        return {
            'message': 'user update  successful'
        }
    }

}

exports.setProfile = async (parent,args, context) => {
    console.log("args in setProfile",args)
    console.log("context in setProfile",context)
    if (args) {
        var verifiedToken = checkToken(context.token)
        var updateProfile = await userModel.findOneAndUpdate(
            {
                '_id': verifiedToken.id
            },
            {
                $set: {
                    setProfile: args.file
                }
            })
            if(updateProfile){
                return{
                    "message":"profile update successful",
                    status:true
                }
            }
            else{
                return{
                "message":"profile update successful",
                status:false
            }
            }


    } else {
        return {
            "message": "file is mandatory",
            "status": false
        }
    }
}
