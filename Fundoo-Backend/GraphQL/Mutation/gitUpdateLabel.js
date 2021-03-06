const axios = require("axios")
const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require('../../middleware/vereifyToken')



exports.gitUpdateLabel = async (root, args, context) => {
    var result={
        message:"something bad happend",
        "satus":false
    }
    //check code present or not in  context 
    try{
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
                    method: 'POST',
                    url: `https://api.github.com/repos/kalpeshnawkar/java/labels/label1?access_token=${access_token}`,
                    headers: {
                        Access: "application/json"
                    },
                    data: {
                        "name": "label",
                        "description": "Small1 bug fix required",
                        "color": "b01f26"


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
    else {
        return {
            'message': 'code not provided',
            'status': status
        }

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