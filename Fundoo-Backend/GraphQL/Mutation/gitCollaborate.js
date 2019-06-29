const axios = require("axios")
const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require('../../middleware/vereifyToken')
const { axiosService } = require("../../middleware/axiosService")

var GITHUB_REPOS_URL = `https://api.github.com/repos`
/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */

exports.gitCreateCollaborate = async (root, args, context) => {
    var result = {
        "message": "something bad happend",
        "status": false
    }
    try {
        //check code present or not in  context 
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
               var url=`${GITHUB_REPOS_URL}/${args.owner}/${args.repository}/collaborators/${args.username}?access_token=${access_token}`,
                var response = await axiosService(url,'put') 
                return{
                    "message":"git collaborate successfully",
                    "status":true
                 }

            }
        }
        //if code not in context then return message "code not provided"        
        else {
                 throw new Error('code not provided')
        }
    }
    catch (e) {
        if (e instanceof ReferenceError
            || e instanceof SyntaxError
            || e instanceof TypeError
            || e instanceof RangeError) {
            return result;
        }
        else {
            result.message = e.message;
            return result
        }
    }
}

exports.gitRemoveCollaborate = async (root, args, context) => {
    //check code present or not in  context 
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
            return {
                "message": "user not registered",
                "status": false
            }
        }

        //check email id verfied or not
        else if (user[0].isVerify == false) {
            return {
                "message": "please,verify your email",
                "status": false
            }
        }


        else {
            await axios(

                {
                    method: 'DELETE',
                    url: `https://api.github.com/repos/${args.owner}/${args.repository}/collaborators/${args.username}?access_token=${access_token}`,
                    headers: {
                        Accept: "application/json"
                    }
                }
            )
                //print a reponse 
                .then(function (response) {

                    console.log('response', response)
                    //if got a response then send a access_token in axiosGet() as param

                })
                // if any error then print it
                .catch(function (err) {
                    console.log(err)
                })


        }
    }
    //if code not in context then return message "code not provided" 
    //jdjds
    //jjsjssksks       
    else {
        return {
            'message': 'code not provided',
            'status': status
        }

    }
}



 