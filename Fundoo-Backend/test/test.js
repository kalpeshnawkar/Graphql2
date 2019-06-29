const { describe, it } = require('mocha')
//const chai = require('chai')
const { expect } = require('chai')
var request = require('supertest')
const server = require('../server')
describe('GraphQL', () => {
      it('registration', (done) => {
         // var data = readFile()
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: `mutation{registration(firstName: "kshiteej",lastName: "nawkar",email: "knawkar@gmail.com",password: "knawkar123") {message}}` })
            .expect(200)
          .end((err, res) => {                 // console.log(res.text);

                if (err) return done(err);
               expect(JSON.parse(res.text).data.registration.message).to.deep.equal("email already exit")
                 done();
            })
    })

 
    it('login', (done) => {
         request('http://localhost:3000/')
            .post('/graphql')
             .send({ query: 'mutation{login(email:"knawkar@gmail.com",password:"kshiteej@123"){message}}' })
             .expect(200)
           .end((err, res) => {
                if (err) return done(err);
                expect(JSON.parse(res.text).data.login.message).to.deep.equal("login successfully")
                done();
            })
     })
     it('forgot password', (done) => {
         request('http://localhost:3000/')
            .post('/graphql')
            .send({ query: 'mutation{forgotPassword(email:"nawkarkshiteej@gmail.com"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                expect(JSON.parse(res.text).data.forgotPassword.message).to.deep.equal("plz,check your Email")
               done();
             })
     })
     it('reset password', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .query({ 'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDU0M2VjNDAyODc4MmFmNWNiNjdjZCIsImlhdCI6MTU1NzQ4MDk4NX0.MW8UrdZg4rbEoIbdBZiDHWAm0tTEgitWsa_DszDvRUc" })
             .send({ query: 'mutation{resetPassword(password:"kshiteej@1234"){message}}' })
             .expect(200)
            .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.resetPassword.message).to.deep.equal("password is reseted")
                 done();
             })
     })
     it('create label', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
              .query({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDU0M2VjNDAyODc4MmFmNWNiNjdjZCIsImlhdCI6MTU1NzQ4MzQzM30.zqgUJoeebw6Jb7AngWvxp4iHtss8i9qFHxRqfK4UdL4" })
             .send({ query: 'mutation{createLabel(labelName:"nawkark1234"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.createLabel.message).to.deep.equal("label already exit")
                 done();
             })
     })
     it('create note', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .query({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZDU0M2VjNDAyODc4MmFmNWNiNjdjZCIsImlhdCI6MTU1NzQ4MzQzM30.zqgUJoeebw6Jb7AngWvxp4iHtss8i9qFHxRqfK4UdL4" })
             .send({ query: 'mutation{createNote(title:"kshiteej", description:"kshiteej note"){message}}' })
              .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("note save successfully")
                 done()
             })
     })
     it('update note', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: 'mutation{updateNote(title:"kshiteej1",description:"kshiteej note1",noteId:"5cebb169c1ffd6345620229b"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.updateNote.message).to.deep.equal("udated note successfully")
                 done()
             })
     })
     it('remove note', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: 'mutation{removeNote(noteId:"5cd57199e482e8449974f0fb"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.removeNote.message).to.deep.equal("note delete unsuccessfully")
                 done()

             })
     })
     it('update label', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: 'mutation{updateLabel(labelName:"kshiteej",labelId:"5cd543ec4028782af5cb67cd"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.updateLabel.message).to.deep.equal("udated label successfully")
                 done()
             })
     })
     it('remove label', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: 'mutation{removeLabel(labelId:"5cd543ec4028782af5cb67cd"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.removeLabel.message).to.deep.equal("label delete successfully")
                 done()
             })
     })
     it('add label', (done) => {
         request('http://localhost:3000/')
             .post('/graphql')
             .send({ query: 'mutation{addLabel(noteId:"5cd57199e482e8449974f0fb",labelId:"5cd543ec4028782af5cb67cd"){message}}' })
             .expect(200)
             .end((err, res) => {
                 if (err) return done(err);
                 expect(JSON.parse(res.text).data.addLabel.message).to.deep.equal("label added sucessfully")
                done()
             })
     })
      it("OAuth",(done)=>{
          request('http://localhost:3000/')
          .post('/greaphql')
          .send({query:'mutation{OAuth() {message}}'})
          .expect(200)
          .end((err,res)=>{
              if(err) return done(err);
              expect(JSON.parse(res.text).data.OAuth.message).to.deep.equal("")

         })
    })
    it("gitRepository",(done)=>{
        request('http://localhost:3000/')
        .post('/graphql')
        .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
        .send({query:'mutation{gitRepository{message}}'})
        .expect(200)
        .end((err,res)=>{
            if(err)return done(err);
            console.log((JSON.parse(res.text)))
            expect(JSON.parse(res.text).data.gitRepository.message).to.deep.equal("note already created")
            done()       
        })
    })
     

it("archivesNotes",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{archivesNotes(noteId:"5cf4b65220e7cc1ef658b336"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.archivesNotes.message).to.deep.equal("note already archive")
        done()       
    })
})


it("trashNotes",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{trashNotes(noteId:"5cf4b65220e7cc1ef658b336"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.trashNotes.message).to.deep.equal("note already in trash")
        done()       
    })
})

it("remainderNote",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{remainderNote(date:"02/10/2015 2:30:22",noteId:"5cf4b65220e7cc1ef658b335"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.remainderNote.message).to.deep.equal("remainder set successfully")
        done()       
    })
})



it("archiveRemove",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{archiveRemove(noteId:"5cf4b65220e7cc1ef658b335"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.archiveRemove.message).to.deep.equal("archives remove Successful")
        done()       
    })
})


it("trashRemove",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{trashRemove(noteId:"5d109591caf54622879f608d"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.trashRemove.message).to.deep.equal("trash remove Successful")
        done()       
    })
})



it("remainderRemove",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjRiNTQ2MjBlN2NjMWVmNjU4YjMzNCIsImlhdCI6MTU1OTU0MTA2Mn0.nUM46b3HHBQOQgZ5S8FQrtRe8SdCQRJS4oiHc3Cluec"})
    .send({query:'mutation{remainderRemove(noteId:"5cf4b65220e7cc1ef658b335"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.remainderRemove.message).to.deep.equal("remainder remove successfully")
        done()       
    })
 })

it("gitCreateStar",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitCreateStar(repositoryID: "MDEwOlJlcG9zaXRvcnkxNzA4NzIxNTk",ownerID:"MDQ6VXNlcjQ3NjYxNzc0"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.gitCreateStar.message).to.deep.equal("star repositories Successfully")
        done()       
    })
})
 
 it("gitRemoveStar",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitRemoveStar(repositoryID: "MDEwOlJlcG9zaXRvcnkxNzA4NzIxNTk",ownerID:"MDQ6VXNlcjQ3NjYxNzc0"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
        expect(JSON.parse(res.text).data.gitRemoveStar.message).to.deep.equal("remove star repositories successful")
        done()       
    })
})


it("gitCreateWatch",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitCreateWatch(ownerName:"kalpeshnawkar",repositoryName:"java"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       // expect(JSON.parse(res.text).data.gitCreateWatch.message).to.deep.equal()
        done()       
    })
})


it("gitRemoveWatch",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitRemoveWatch(ownerName:"kalpeshnawkar",repositoryName:"java"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       // expect(JSON.parse(res.text).data.gitCreateWatch.message).to.deep.equal()
        done()       
    })
})


it("gitCreateBranch",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitCreateBranch(ownerName:"kalpeshnawkar",repositoryName:"temp",branchName:"testingtemp"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       // expect(JSON.parse(res.text).data.gitCreateWatch.message).to.deep.equal()
        done()       
    })
})



it("gitRemoveBranch",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{gitRemoveBranch(ownerName:"kalpeshnawkar",repositoryName:"temp",branchName:"testingtemp"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       // expect(JSON.parse(res.text).data.gitCreateWatch.message).to.deep.equal()
        done()       
    })
})


it("noteCreateCollaborate",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{noteCreateCollaborate(collaborateID:"5ce7b564bc05d6373986ea63",noteID:"5d136e6063e230513e3b28fb"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       expect(JSON.parse(res.text).data.noteCreateCollaborate.message).to.deep.equal("user collaborate Successful")
        done()       
    })
})



it("noteRemoveCollaborate",(done)=>{
    request('http://localhost:3000/')
    .post('/graphql')
    .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
    .send({query:'mutation{noteRemoveCollaborate(collaborateID:"5ce7b564bc05d6373986ea63",noteID:"5d136e6063e230513e3b28fb"){message}}'})
    .expect(200)
    .end((err,res)=>{
        if(err)return done(err);
        console.log((JSON.parse(res.text)))
       expect(JSON.parse(res.text).data.noteRemoveCollaborate.message).to.deep.equal("collaborate note deleted successfully")
        done()       
    })
})

it("gitCreateIssue",(done)=>{
    request('http://localhost:3000/')
         .post('/graphql')
         .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
         .send({query:'mutation{gitCreateIssue(repositoryID:"MDEwOlJlcG9zaXRvcnkxNzA4NzIxNTk",title:"testingIssue",labelID:["MDU6TGFiZWwxMjM0NjYyNjc3"],gitID:"MDQ6VXNlcjQ3NjYxNzc0"){message}}'})
        .expect(200)
         .end((err,res)=>{
             if(err)return done(err);
             console.log((JSON.parse(res.text)))
            expect(JSON.parse(res.text).data.gitCreateIssue.message).to.deep.equal("Issue created Successfully")
             done()       
         })
     })


     it("gitDeleteIssue",(done)=>{
        request('http://localhost:3000/')
             .post('/graphql')
             .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
             .send({query:'mutation{gitDeleteIssue(issueID:"MDU6SXNzdWU0NTUxNDgwMTg=",gitID:"MDQ6VXNlcjQ3NjYxNzc0"){message}}'})
            .expect(200)
             .end((err,res)=>{
                 if(err)return done(err);
                 console.log((JSON.parse(res.text)))
                expect(JSON.parse(res.text).data.gitDeleteIssue.message).to.deep.equal("isssue delete unsuccessfully")
                 done()       
             })
         })


         it("gitUpdateIssue",(done)=>{
            request('http://localhost:3000/')
                 .post('/graphql')
                 .query({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjZjY0ZTBiODlhOGEyMzMwYzQwYzRiMyIsImlhdCI6MTU1OTY0NTcwN30.JufkXrklegRi9155LT4ugaTT7fSGDqBoAHShD0uctBI"})
                 .send({query:'mutation{gitUpdateIssue(issueID:"MDU6SXNzdWU0NTUwNDY0NzU=" labelID:"MDU6TGFiZWwxMjM0NjYyNjc3"){message}}'})
                .expect(200)
                 .end((err,res)=>{
                     if(err)return done(err);
                     console.log((JSON.parse(res.text)))
                    expect(JSON.parse(res.text).data.gitUpdateIssue.message).to.deep.equal("Issue update successfully")
                     done()       
                 })
             })
        
    

 })