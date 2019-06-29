const collaborateModel=require("../../mongoDb/collaborateSchema")
const userModel=require('../../mongoDb/userSchema')
const noteModel=require("../../mongoDb/noteSchema")
const {checkToken}=require("../../middleware/vereifyToken")
exports.noteCreateCollaborate=async(parent,args,context)=>{
    if(context.token){
        var varifiedToken=checkToken(context.token)
        var userData=await userModel.find({_id:varifiedToken.id})
        console.log("userData===",userData)
        if(!userData.length>0){
            return{
                "mesage":"user not found",
                "status":false
            }
           }
           else {
            var collaborateUserData=await userModel.find({_id:args.collaborateID})
            console.log("collaborate user Data===",collaborateUserData)
            console.log("collaborateUserData length",collaborateUserData.length)
            if(!collaborateUserData.length>0){
                return{
                    "message":"collaborate user not found",
                    "Status":false
                }
            }
                else{
                    var noteData=await noteModel.find({_id:args.noteID})
                    console.log("note Data===",noteData)
                    if(!noteData.length>0){
                    return{
                        "message":"note note found",
                        "status":false
                    }
                }
                    else{
                        var savedCollarateNote=await collaborateModel.find({collaborateID:args.collaborateID,noteID:args.noteID})
                        if(savedCollarateNote.length>0){
                            return{
                                "message":"user already collaborate",
                                "status":false
                            }
                        }
                        console.log("userData[0]._id",userData[0]._id)
                        var collaborateNoteData=new collaborateModel({
                            userID:userData[0]._id,
                            collaborateID:collaborateUserData[0]._id,
                            noteID:args.noteID
                        })
                        console.log("collab",collaborateNoteData);
                        
                        savedCollaborateNote=await collaborateNoteData.save()
                        console.log("savedCollaborateNote",savedCollaborateNote)
                        return{
                            "message":"user collaborate Successful",
                            "status":true
                        }
                    }
                }
            
           }
    }
}


exports.noteRemoveCollaborate=async(parent,args,context)=>{
    if(context.token){
        var varifiedToken=checkToken(context.token)
        // var userData=await userModel.find({_id:varifiedToken.id})
        // console.log("userData===",userData)
        // if(!userData.length>0){
        //     return{
        //         "mesage":"user not found",
        //         "status":false
        //     }
        //    }
        //    else {
        //     var collaborateUserData=await userModel.find({_id:args.collaborateId})
        //     console.log("collaborate user Data===",collaborateUserData)
        //     console.log("collaborateUserData length",collaborateUserData.length)
        //     if(!collaborateUserData.length>0){
        //         return{
        //             "message":"collaborate user not found",
        //             "Status":false
        //         }
        //     }
        //         else{
        //             var noteData=await noteModel.find({_id:args.noteId})
        //             console.log("note Data===",noteData)
        //             if(!noteData.length>0){
        //             return{
        //                 "message":"note note found",
        //                 "status":false
        //             }
        //         }
        //             else{
                        var savedCollaborateNote=await collaborateModel.findOneAndRemove({collaborateID:args.collaborateID,noteID:args.noteID})
                        console.log("savedCollaborate===",savedCollaborateNote)
                        if(savedCollaborateNote){
                            return{
                                "message":"collaborate note deleted successfully",
                                "status":true
                            }
                        }
                     else{
                        return{
                            "message":"collaborate note deleted successfully",
                            "status":false
                        }
                    }
                }
            
           }
    