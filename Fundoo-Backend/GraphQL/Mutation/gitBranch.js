const axios = require("axios")
const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require('../../middleware/vereifyToken')
const { axiosService } = require("../../middleware/axiosService")
const { axiosGetBranch } = require("../../middleware/axiosService")


var GITHUB_REPOS_URL = `https://api.github.com/repos`
/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */
exports.gitCreateBranch = async (parent, args, context) => {

    var result = {
        "message": "something bad happend",
        "status": false
    }
    try {
        if (!args.ownerName || !args.repositoryName || !args.branchName) {
            throw new Error("ownerName,RepositoryName and branchName not provided")
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
                var url = `${GITHUB_REPOS_URL}/${args.ownerName}/${args.repositoryName}/git/refs?access_token=${access_token}`
                var response = await axiosService(url, 'get')
                //print a reponse 

                var sha = response.data[0].object.sha
                console.log('response', response.data[0].object.sha)
                var url = `${GITHUB_REPOS_URL}/${args.ownerName}/${args.repositoryName}/git/refs?access_token=${access_token}`
                var ref = `refs/heads/${args.branchName}`
                var res = axiosGetBranch(sha, url, 'post', ref)
                console.log("res===", res)
                return {
                    message: "git Branch Successful",
                    "status": true
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
            || e instanceof RangeError) {
            return result;

        }
        else {
            result.message = e.message;
            return result
        }
    }
}
/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */

exports.gitRemoveBranch = async (parent, args, context) => {

    var result = {
        "message": "something bad happend",
        "status": false
    }
    try {
        if (!args.ownerName || !args.repositoryName || !args.branchName) {
            throw new Error("ownerName,RepositoryName and branchName not provided")
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
                var url = `${GITHUB_REPOS_URL}/${args.ownerName}/${args.repositoryName}/git/refs/heads/${args.branchName}?access_token=${access_token}`
                var res = await axiosService(url, 'delete')

                //print a reponse 
                console.log("res===", res)
                return {
                    "message": "git delete Branch Successful",
                    "status": true
                }
            }
        }
        //if code not in context then return message "code not provided"        
        else {
            throw new Error('token not provided')
        }
    }
    catch(e) {
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

