const labelModel = require('../../mongoDb/labelSchema')
const { checkToken } = require('../../middleware/vereifyToken')

exports.createLabel = async (parent, args, context) => {
    var varifiedToken = checkToken(context.token)
    console.log("varifiedToken in mutation", varifiedToken)
    if (varifiedToken) {
        var label = await labelModel.find({ 'labelName': args.labelName }).sort({'labelName':1});
        console.log("label id in label mutation", varifiedToken.id)
        console.log("label in mutation",label)
        console.log(label.labelName)
        console.log(args.labelName)
        if (label.length>0) {
            return {
                "message": "label already exit",
                'status': false
            }
        }
        else {
            var newLabel = new labelModel({
                labelName: args.labelName,
                userID: varifiedToken.id
              


            })
            var labelSaved = await newLabel.save()
            if (labelSaved) {
                return {
                    'message': "label save successfully",
                    'status': true,
                    'labelId': labelSaved._id,
                    

                }
            }
            else {
                return {
                    'mesage': 'label not save',
                    'status': false
                }
            }
        }
    }
    else {
        return {
            "message": "token not varify",
            'status': false
        }
    }
}
exports.updateLabel = async (parent, args, ) => {


    var updateLabel = await labelModel.update({ '_id': args.labelId },
        {
            $set: {
                'labelName': args.labelName
            }
        },
        {
            'new': true
        })
    if (updateLabel) {
        return {
            'message': "udated label successfully",
            'status': true
        }
    }
    else {
        return {
            'message': "udated label unsuccessfully",
            'status': false
        }
    }
}




exports.removeLabel = async (parent, args) => {
    var removeLabel = await labelModel.deleteOne({ '_id': args.labelId })
    if (removeLabel) {
        return {
            "message": "label delete successfully",
            'status': true
        }
    }
    else {
        return {
            'message': 'label delete unsuccessfully',
            'status': false
        }
    }
}
