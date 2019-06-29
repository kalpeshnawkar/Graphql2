const { checkToken } = require("../../middleware/vereifyToken")
const noteModel = require("../../mongoDb/noteSchema")
exports.searchNote = async (root, args, context) => {
    var result={
        message:"something bad happend",
        "satus":false
    }
    try {
    if (context.token) {
    var varifiedToken = checkToken(context.token)
    var titleregex = new RegExp('^'+args.title)
    if (varifiedToken) {
    var notes = await noteModel.find({title: titleregex ,userId:varifiedToken.id })
    console.log(notes)
    return notes
    }
    }
    else {
    throw new Error("token not provided")
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