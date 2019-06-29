const { gql } = require('apollo-server')

//Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
#This "User" type can be used in other type declarations.

type User {
        firstName: String
        lastName: String
        email: String
        password: String
        file:String
        token:String
        message:String
        status:String
    }
    type Label {
        labelName:String
        _id:String
    }
    type allNote {
        allNotes: [Note]
        message:String
    }
    type Note {
        title:String
        description:String
        message:String
        status:String
        noteId:String
     
    }
    type OAuth{
        message:String
        token:String
        status:Boolean
    }
    type gitIssue{
        message:String
        status:Boolean
        issueID:ID
        gitID:ID
}
type searchNotes{
    title:String
    description:String
}
 

 
    type Query {
        userResolvers:[User]
        labelResolvers:[Label]
        notesResolvers: [Note]

    }
    type Mutation {
        registration(firstName:String!, lastName:String!, email:String!, password:String!):User
        login(email:String!,password:String!):User
        emailVerify:User
        forgotPassword(email:String!):User
        resetPassword(password:String!):User
        update(firstName:String):User
        createLabel(labelName:String!):Label
        createNote(title:String!, description:String!):Note
        updateLabel(labelName:String! labelId:String!):Label
        removeLabel(labelId:String!):Label
        updateNote(title:String, description:String, noteId:String):Note
        removeNote(noteId:String!):Note
        addLabel(noteId:String!,labelId:String!):Note
        OAuth:OAuth
        verifyEmail:OAuth
        setProfile(file:String!):User
        gitRepository(ownerName:String!,repositoryNumber:Int!):User
        getAllNote:allNote
        archivesNotes(noteId:String!):Note
        trashNotes(noteId:String!):Note
        remainderNote(date:String!,noteId:String!):Note
        archiveRemove(noteId:String!):Note
        trashRemove(noteId:String!):Note
        remainderRemove(noteId:String!):Note
        gitCreateCollaborate(owner:String! repository:String! username:String!):OAuth
        gitRemoveCollaborate(owner:String! repository:String! username:String!):OAuth
        gitCreateStar(repositoryID:ID! ownerID:ID!):OAuth
        gitRemoveStar(repositoryID:ID! ownerID:ID!):OAuth
        gitCreateWatch(ownerName:String!,repositoryName:String!):OAuth
        gitRemoveWatch(ownerName:String!,repositoryName:String!):OAuth
        gitCreateBranch(ownerName:String!,repositoryName:String!,branchName:String!):OAuth
        gitRemoveBranch(ownerName:String!,repositoryName:String!,branchName:String!):OAuth
        noteCreateCollaborate(collaborateID:ID, noteID:ID):User
        noteRemoveCollaborate(collaborateID:ID, noteID:ID):User
        gitCreateIssue(repositoryID:ID!,title:String!,labelID:[ID!],gitID:ID!):OAuth
        gitDeleteIssue(issueID:ID!,gitID:String!):gitIssue
        gitUpdateIssue(issueID:ID!,labelID:ID!):OAuth
        gitUpdateLabel:OAuth
        gitAddCommentIssue(issueID:ID!,issueComment:String!):OAuth
        searchNote(title:String!):[searchNotes]

        

}`

module.exports = { typeDefs }

