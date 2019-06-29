const jwt = require("jsonwebtoken")
exports.checkToken = (token) => {
    console.log("token in before verify",token)

    var verifiedToken = jwt.verify(token, 'secreatekey')
    console.log("token in verify", verifiedToken)
    return verifiedToken
}
