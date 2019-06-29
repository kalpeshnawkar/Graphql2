const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require("../../middleware/vereifyToken")
const { createApolloFetch } = require('apollo-fetch')
const noteModel = require("../../mongoDb/noteSchema")
/**
  * 
  * @param {string} parent
  * @param {string} root
  * @param {String} context
  */

exports.gitCreateStar = async (parent, args, context) => {
    //check token provided or not 
    try {
        
        if (context.token) {
            //verified a token
            var varifiedtoken = checkToken(context.token)
            //find userid in userSchema
            var user = await userModel.find({ "_id": varifiedtoken.id })
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

                var fetchData = createApolloFetch({
                    uri: `https://api.github.com/graphql?access_token=${access_token}`
                })
                console.log("fetchdata==", fetchData)
                var fetch = await fetchData({
                    query: (`
                        mutation {
                            addStar(input: {
                                starrableId:"${args.repositoryID}",
                                clientMutationId:"${args.ownerID}"
                            })
                            {
                                clientMutationId
                            }
                        }`
                    )
                })


                //var repositoriesData = fetch.data.repositoryOwner.repositories.nodes
                console.log("repositoriesData==", fetch)

                return {
                    "message": "star repositories Successfully"
                }

            }
        }

    }
    catch (err) {
        console.log(err)
    }
}



/**
  * 
  * @param {string} parent
  * @param {string} root
  * @param {String} context
  */

 exports.gitRemoveStar = async (parent, args, context) => {
    //check token provided or not 
    try {
        console.log("args===",args.starrableId)
        if (context.token) {
            //verified a token
            var varifiedtoken = checkToken(context.token)
            //find userid in userSchema
            var user = await userModel.find({ "_id": varifiedtoken.id })
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

                var fetchData = createApolloFetch({
                    uri: `https://api.github.com/graphql?access_token=${access_token}`
                })
                console.log("fetchdata==", fetchData)
                var fetch = await fetchData({
                    query: (`mutation {removeStar(input: {starrableId: "${args.repositoryID}", clientMutationId:"${args.ownerID}"}) {clientMutationId}}`
                 ) 
                })


                //var repositoriesData = fetch.data.repositoryOwner.repositories.nodes
                console.log("repositoriesData==", fetch)

                return {
                    "message": "remove star repositories successful"
                }

            }
        }

    }
    catch (err) {
        console.log(err)
    }
}