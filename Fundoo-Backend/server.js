/**
 * Purpose      :Create a Fundoo App for storing notes 
* 
* @description
* 
* @file        :server.js
* @overview    :It is a back  end of Fundoo App using apollo Framework, node js,mongodb database with GraphQl.Server are running on 4000 localhost.
* @author      :Kshiteej Nawkar <knawkar@gmail.com>
* @version     :1.0
* @since       :`04/05/2019  */

require('dotenv').config()
const { ApolloServer } = require('apollo-server');
const resolvers = require('./GraphQL/Resolver/resolvers')
const { typeDefs } = require('./GraphQL/types/types')
const mongoose = require('mongoose')
const dbConfig = require('./config/dbConfig')
const redis =require('./config/redisConfig');

//the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => ({
        token: req.query.token,
        code:req.query.code,
        origin: req.headers.origin
    })
});

//This `listen` method launches a web-server on 4000 port
server.listen(process.env.port || 8080, () =>
    console.log('🚀  Server connect at port',process.env.port))
//connect mongodb with server
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(()    => {
        console.log("DataBase connected successfully");
        //  process.exit(0)
    })
    .catch((err) => {
        console.log(err);
    })
//  client.on('connect',function(){
//      console.log("redis connected successfully")
//  })

module.exports = { server }

                                                                                                                                                       
