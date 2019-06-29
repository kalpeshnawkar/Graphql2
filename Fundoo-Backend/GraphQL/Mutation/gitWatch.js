const {axiosService} = require("../../middleware/axiosService")
const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require('../../middleware/vereifyToken')

let GITHUB_SUBSCRIPTION_URL = `https://api.github.com/user/subscriptions`
/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */
exports.gitCreateWatch = async (parent, args, context) => {
    let result = {
        'message': 'Something bad happened',
        'status': false
    }

    try {
        if (!args.ownerName || !args.repositoryName) {
            throw new Error("ownerName and repositoryName not provided")
        }
        if (context.token) {  //check code present or not in  context
            var varifiedtoken = checkToken(context.token);  //verified a token
            var user = await userModel.find({ "_id": varifiedtoken.id }); //find userid in userSchema
            var access_token = user[0].gitToken
            if (!user > 0) { //check user register or not
                throw new Error("user not registered");
            }
            else if (user[0].isVerify == false) { //check email id verfied or not
                throw new Error("please,verify your email");
            }
            else {
                var url= `${GITHUB_SUBSCRIPTION_URL}/${args.ownerName}/${args.repositoryName}?access_token=${access_token}`
                var res = await axiosService(url, 'put')
                console.log(res)
                    return{
                        "message":"watch successfully",
                        "status":true
                    }
                }    
        }
        else { //if code not in context then return message "code not provided"   
            throw new Error("token not provided");
        }
    }
    catch (e) {
        console.log("e=======", e)
        if (e instanceof ReferenceError
            || e instanceof SyntaxError
            || e instanceof TypeError
            || e instanceof RangeError) {
            //  || e instanceof SystemError
            // || e instanceof AssertionError){
            return result;
        }
        else {

            result.message = e.message;
            return result;
        }
    }
}


/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */

exports.gitRemoveWatch = async (parent, args, context) => {

    let result = {
        "message": "Something bad happened",
        "status": false
    }
    try {
        if (!args.ownerName || !args.repositoryName) {
            throw new Error("ownerName and repositoryName not provided")
        }
        //check token present or not in  context 
        if (context.token) {
            //verified a token
            var varifiedtoken = checkToken(context.token)
            //find userid in userSchema
            var user = await userModel.find({ "_id": varifiedtoken.id })
            console.log("user===", user)
            var access_token = user[0].gitToken
            console.log("token=>>>", access_token);
            //check user register or not
            if (!user > 0) {
                throw new Error("user not registered")
           }

            //check email id verfied or not
            else if (user[0].isVerify == false) {
                throw new Error("please,verify your email")
            }
            else {
            var url= `${GITHUB_SUBSCRIPTION_URL}/${args.ownerName}/${args.repositoryName}?access_token=${access_token}`
            var res= await axiosService(url,'delete')
                 return{
                    "message":"git remove watch  successfully",
                    "status":true
                 }
              }
        }
        //if code not in context then return message "code not provided"        
        else {
            throw new Error('token not provided')
            }
    }

    catch (e) {
        if (e instanceof ReferenceError
            || e instanceof SyntaxError
            || e instanceof TypeError
            || e instanceof RangeError ) {
            return result;
        }
        else {
            result.meeage = e.message;
            return result
        }
    }
}



