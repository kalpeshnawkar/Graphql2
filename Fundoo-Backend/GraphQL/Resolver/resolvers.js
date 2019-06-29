const userResolvers = require('../Query/query').users
const registration = require("../Mutation/user").registration
const login = require("../Mutation/user").login
const emailVerify = require("../Mutation/user").emailVerify
const forgotPassword = require('../Mutation/user').forgotPassword
const resetPassword = require('../Mutation/user').resetPassword
const update = require('../Mutation/user').update
const labelResolvers = require('../Query/query').labels
const createLabel = require('../Mutation/label').createLabel
const notesResolvers = require('../Query/query').notes
const createNote = require('../Mutation/note').createNote
const updateLabel = require('../Mutation/label').updateLabel
const removeLabel = require('../Mutation/label').removeLabel
const updateNote = require('../Mutation/note').updateNote
const removeNote = require('../Mutation/note').removeNote
const addLabel = require('../Mutation/note').addLabel
const OAuth = require('../Mutation/OAuth').OAuth
const verifyEmail = require("../Mutation/OAuth").verifyEmail
const setProfile = require("../Mutation/user").setProfile
const gitRepository = require("../Mutation/gitRepository").gitRepository
const getAllNote = require("../Mutation/note").getAllNote
const archivesNotes = require("../Mutation/note").archivesNotes
const trashNotes = require("../Mutation/note").trashNotes
const remainderNote = require("../Mutation/note").remainderNote
const archiveRemove = require("../Mutation/note").archivesRemove
const trashRemove = require("../Mutation/note").trashRemove
const remainderRemove=require("../Mutation/note").remainderRemove
const gitCreateCollaborate=require("../Mutation/gitCollaborate").gitCreateCollaborate
const gitRemoveCollaborate=require('../Mutation/gitCollaborate').gitRemoveCollaborate
const gitCreateStar=require("../Mutation/gitStar").gitCreateStar
const gitRemoveStar=require("../Mutation/gitStar").gitRemoveStar
const gitCreateWatch=require("../Mutation/gitWatch").gitCreateWatch
const gitRemoveWatch=require("../Mutation/gitWatch").gitRemoveWatch
const gitCreateBranch=require("../Mutation/gitBranch").gitCreateBranch
const gitRemoveBranch=require('../Mutation/gitBranch').gitRemoveBranch
const noteCreateCollaborate=require('../Mutation/noteCollaborate').noteCreateCollaborate
const noteRemoveCollaborate=require('../Mutation/noteCollaborate').noteRemoveCollaborate
const gitUpdateLabel=require("../Mutation/gitUpdateLabel").gitUpdateLabel
const gitCreateIssue=require("../Mutation/gitIssue").gitCreateIssue
const gitDeleteIssue=require("../Mutation/gitIssue").gitDeleteIssue
const  gitUpdateIssue=require("../Mutation/gitIssue").gitUpdateIssue
const gitAddCommentIssue=require("../Mutation/gitIssue").gitAddCommentIssue
const searchNote=require("../Mutation/searchNotes").searchNote


//Resolvers define the technique for fetching the types in the
// schema. 
const resolvers = {
  Query: {
    userResolvers,
    labelResolvers,
    notesResolvers
  },
  Mutation: {
    registration,
    login,
    emailVerify,
    forgotPassword,
    resetPassword,
    update,
    createLabel,
    createNote,
    updateLabel,
    removeLabel,
    updateNote,
    removeNote,
    addLabel,
    OAuth,
    verifyEmail,
    setProfile,
    gitRepository,
    getAllNote,
    archivesNotes,
    trashNotes,
    remainderNote,
    archiveRemove,
    trashRemove,
    remainderRemove,
    gitCreateCollaborate,
    gitRemoveCollaborate,
    gitCreateStar,
    gitRemoveStar,
    gitCreateWatch,
    gitRemoveWatch,
    gitCreateBranch,
    gitRemoveBranch,
    noteCreateCollaborate,
    noteRemoveCollaborate,
    gitUpdateLabel,
    gitCreateIssue,
    gitDeleteIssue,
    gitUpdateIssue,
    gitAddCommentIssue,
    searchNote


   
  }
}

module.exports = resolvers