const axios = require("axios")
const userModel = require("../../mongoDb/userSchema")
const { sendMailer } = require('../../middleware/sendMailer')
const jwt = require('jsonwebtoken')
const { checkToken } = require('../../middleware/vereifyToken')



exports.OAuth = async (root, args, context) => {
    //check code present or not in  context 
    if (context.code) {
        console.log(context.code)
        //send a post request to get access_token from github
        axios(

            {
                method: 'POST',
                url: `${process.env.token}client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${context.code}`,
                headers: {
                    Accept: "application/json"
                }
            }
        )
            //print a reponse 
            .then(function (response) {
                const access_token = response.data.access_token
                console.log('acess_token', access_token)
                //if got a response then send a access_token in axiosGet() as param
                axiosGet(access_token)
            })
            //if any error then print it
            .catch(function (err) {
                console.log(err)
            })
    }
    //if code not in context then return message "code not provided"        
    else {
        return {
            'message': 'code not provided',
            'status': status
        }

    }
    /**
    * 
    * @param {string} access_token
    */
    function axiosGet(access_token) {
        axios(

            {
                method: 'GET',
                url: `${process.env.GITUSERDATA}access_token=${access_token}`,
                headers: {
                    Accept: "application/json"
                }
            }
        )

            .then(async response => {
                console.log("response.data in OAuth", response.data);
                //if got a response back then find user alredy present or not 
                var userData = await userModel.find({ gitid: response.data.id })
                console.log("user data in Oauth", userData)
                console.log("length of userDatat in OAuth", userData.length)
                //if user not present already then save the details of github user
                if (!userData.length > 0) {
                    var newUser = new userModel({ gitToken: access_token, gitid: response.data.id, firstName: response.data.login, email: response.data.email })
                    var savedUser = await newUser.save();
                    console.log("savedUser in OAuth", savedUser)
                    console.log("userId==", savedUser._id)
                    //check user details save successfully or not
                    if (savedUser) {
                        //if user details save successfully then create token for user id
                        var token = jwt.sign({ id: savedUser._id }, 'secreatekey')
                        console.log("token in OAuth", token)
                        //create a url with token
                        console.log('origin in OAuth', context.origin)
                        var url = `${context.origin}/graphql?token=` + token
                        console.log("url in OAuth", url)
                        //send url on valid email
                        sendMailer(url, response.data.email)
                    }
                }
                //if user id found then print 'user already saved'
                else {
                    console.log("user saved already")
                }

            })
            .catch(function (err) {
                console.log(err)
            })
    }

}

exports.verifyEmail = async (root, args, context) => {
    var tokenVarified = checkToken(context.token)
    if (tokenVarified) {
        var emailVarified = await userModel.updateOne({ _id: tokenVarified.id }, { $set: { isVerify: true } })
        if (emailVarified) {
            return {
                "message": "email Varified Successfully",
                'status': true
            }

        }
        else {
            return {
                "message": "email Varified Unseccessfully",
                'status': false
            }
        }
    }

}


