const userModel = require("../../mongoDb/userSchema")
const { checkToken } = require("../../middleware/vereifyToken")
const { createApolloFetch } = require('apollo-fetch')
const noteModel = require("../../mongoDb/noteSchema")
const { fetchService } = require("../../middleware/axiosService")
/**
  * 
  * @param {string} parent
  * @param {string} args
  * @param {String} context
  */

exports.gitRepository = async (parent, args, context) => {

    let result = {
        "message": "Something bad happened",
        "status": false
    }
    try {
        if (!args.ownerName || !args.repositoryNumber) {

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

                var fetchData = createApolloFetch({
                    uri: `https://api.github.com/graphql?access_token=${access_token}`
                })

                console.log("fetchdatat==", fetchData)

                // var query = `{repositoryOwner(login:"kalpeshnawkar") { repositories(first:10) { nodes {name description } }}  }`
                var fetch = await fetchData({
                    query: `{ repositoryOwner(login: ${args.ownerName}) { id login avatarUrl repositories(first:${args.repositoryNumber}){ nodes{ isPrivate name description} } } }`,
                })

                // var fetch = await fetchService(fetchData, query)
                var repositoriesData = fetch.data.repositoryOwner.repositories.nodes
                console.log("repositoriesData==", repositoriesData)
                console.log(repositoriesData.length)

                var repositoryNote = await noteModel.find({ userId: varifiedtoken.id })
                console.log("repositoryNote in git respository=", repositoryNote)    
                for (var i = 0; i < repositoriesData.length; i++) {
                    var checkNote = false
                    for (var j = 0; j < repositoryNote.length; j++) {
                        if (repositoryNote[j].title == repositoriesData[i].name) {
                            checkNote = true
                        }
                    }
                        //create new object to save data of repositories in note schema
                    if (checkNote == false) {
                        var newNote = new noteModel({
                            title: repositoriesData[i].name,
                            description: repositoriesData[i].description,
                            userId: varifiedtoken.id,
                        })



                        //save a new object in note schema
                        var noteSaved = await newNote.save()
                        console.log(noteSaved)

                    }
                }
                        return {
                            "message": "repositories save Successfully",
                            "status": true
                        }
            }
        }

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