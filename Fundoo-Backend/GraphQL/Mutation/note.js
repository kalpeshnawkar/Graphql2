const noteModel = require('../../mongoDb/noteSchema')
const { checkToken } = require('../../middleware/vereifyToken')
exports.createNote = async (parent, args, context) => {
    var verifiedToken = checkToken(context.token)
    var newNote = await noteModel({
        title: args.title,
        description: args.description,
        userId: verifiedToken.id,
    })
    var noteSaved = await newNote.save()
    console.log("noteId in note mutation", noteSaved._id)
    if (noteSaved) {
        return {
            'message': "note save successfully",
            'status': true,
            'noteId': noteSaved._id,

        }
    }
    else {
        return {
            'message': "note not saved",
            'status': false
        }
    }

}


exports.updateNote = async (parent, args, ) => {



    var updateNote = await noteModel.findOneAndUpdate({ '_id': args.noteId },
        {
            $set: {
                'title': args.labelName,
                'remainder': date,
                'description': args.description
            } 
          
        }
    )
    if (updateNote) {
        return {
            'message': "udated note successfully",
            'status': true
        }
    }
    else {
        return {
            'message': "udated note unsuccessfully",
            'status': false
        }
    }

}


exports.removeNote = async (parent, args) => {
    var removeNote = await noteModel.findByIdAndRemove({ '_id': args.noteId })
    if (removeNote) {
        return {
            "message": "note delete successfully",
            'status': true
        }
    }
    else {
        return {
            'message': 'note delete unsuccessfully',
            'status': false
        }
    }
}


exports.addLabel = async (parent, args) => {
    var label = await noteModel.find({ _id: args.noteId, labelId: args.labelId })
    console.log("label in not mutation ", label.length)
    if (label.labelId) {
        return {
            'message': "label already exits",
            'status': false
        }
    }

    var addLabel = await noteModel.update({ _id: args.noteId },
        {
            $push: {
                labelId: args.labelId
            },
        })
    if (addLabel) {
        return {
            'message': "label added sucessfully",
            'status': true
        }
    }
    else {
        return {
            'message': "label added unsuccessfully",
            'status': false

        }
    }
}


exports.getAllNote = async (parent, args, context) => {
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var note = await noteModel.find({ 'userId': varifiedToken.id })
        console.log("all Notes", note)
        return {
            "message": "get all note successfully",
            'status': true,
            "notes": note
        }

    }
    else {
        return {
            'message': "token note provide",
            "status": false
        }
    }
}


exports.archivesNotes = async (parent, args, context) => {
    if (args.noteId) {
        var savedNote = await noteModel.findOne({ _id: args.noteId })
        console.log(savedNote)
        console.log(savedNote.Archives)
        if (!savedNote > 0) {
            return {
                "message": "note  not found",
                "status": false
            }
        }
        else if (savedNote.Archives == true) {
            return {
                "message": "note already archive",
                "status": false
            }
        }
        else {
            var archivesNotes = await noteModel.findOneAndUpdate({ '_id': args.noteId },
                {
                    $set: { 'Archives': true }
                })
            console.log("updated archivesNotes ", archivesNotes)
            return {
                "message": "archives note Successful",
                "satus": false
            }
        }
    }
    else {
        return {
            "message": "notId not provied"
        }
    }

}

exports.trashNotes = async (parent, args, context) => {
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var savedNote = await noteModel.findOne({ userId: varifiedToken.id, _id: args.noteId })
        console.log("savedNote==", savedNote)
        if (!savedNote > 0)
            return {
                "message": "note not found",
                "status": false
            }
        else if (savedNote.trash == true) {
            return {
                "message": "note already in trash",
                "status": false
            }
        }
        else {
            var trashNote = await noteModel.findOneAndUpdate({ userId: varifiedToken.id, _id: args.noteId }, {
                $set: {
                    'trash': true
                }
            })
            console.log("updated trashNote", trashNote)
            return {
                "message": "trash note Successful",
                "status": false
            }
        }

    }
    else {
        return {
            "message": "notId not provied"
        }
    }

}


exports.remainderNote = async (parent, args, context) => {
    console.log("args in reamider", args)
    var newDate = new Date(args.date)
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var savedNote = await noteModel.findOne({ userId: varifiedToken.id, _id: args.noteId })
        if (!savedNote > 0) {
            return {
                "message": "note not found",
                "status": false
            }
        }
        else {
            var remainderNote = await noteModel.findOneAndUpdate({ userId: varifiedToken.id, _id: args.noteId }, {
                $set: { remainder: newDate }
            })
            console.log(remainderNote)
            return {
                "message": "remainder set successfully",
                "status": true
            }
        }
    }

}

exports.archivesRemove = async (parent, args, context) => {
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var savedNote = await noteModel.findOne({ 'userId': varifiedToken.id, '_id': args.noteId })
        console.log(savedNote)
        console.log(savedNote.Archives)
        if (!savedNote > 0) {
            return {
                "message": "note  not found",
                "status": false
            }
        }

        else {
            var archivesNotes = await noteModel.findOneAndUpdate({ 'userId': varifiedToken.id, '_id': args.noteId },
                {
                    $set: { 'Archives': false }
                })
            console.log("updated archivesNotes ", archivesNotes)
            return {
                "message": "archives remove Successful",
                "satus": false
            }
        }
    }
    else {
        return {
            "message": "token not provied"
        }
    }

}


exports.trashRemove = async (parent, args, context) => {
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var savedNote = await noteModel.findOne({ userId: varifiedToken.id, _id: args.noteId })
        console.log("savedNote==", savedNote)
        if (!savedNote > 0)
            return {
                "message": "note not found",
                "status": false
            }

        else {
            var trashNote = await noteModel.findOneAndUpdate({ userId: varifiedToken.id, _id: args.noteId }, {
                $set: {
                    'trash': false
                }
            })
            console.log("updated trashNote", trashNote)
            return {
                "message": "trash remove Successful",
                "status": false
            }
        }

    }
    else {
        return {
            "message": "token not provied"
        }
    }

}


exports.remainderRemove = async (parent, args, context) => {
    if (context.token) {
        var varifiedToken = checkToken(context.token)
        var savedNote = await noteModel.findOne({ userId: varifiedToken.id, _id: args.noteId })
        if (!savedNote > 0) {
            return {
                "message": "note not found",
                "status": false
            }
        }
        else {
            await noteModel.findOneAndUpdate({ userId: varifiedToken.id, _id: args.noteId }, {
                $set: { remainder:"" }
            })
            return {
                "message": "remainder remove successfully",
                "status": true
            }
        }
    }
    else {
        return {
            "message": "token not provied"
        }
    }

}





