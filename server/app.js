const Koa = require("koa")
const router = require('koa-router')()
const Body = require('koa-bodyparser')
const { GraphQLScalarType } = require('graphql')
const { ApolloServer, gql } = require('apollo-server-koa')
const { Kind } = require('graphql/language')

const app = new Koa()
const PORT = 8001

let userList = [
    {
        "id": "2268df679c8061b6920b",
        "name": "刘娜",
        "age": 25
    }
]
const typeDefs = gql`
    input UserMessageInput {
        name: String!
        age: Int
    }

    type User {
        id: ID!
        name: String!
        age: Int
    }

    type Query {
        getUser(id: ID!): User
        getList: [User]
    }

    type Mutation {
        createUser(input:UserMessageInput): User
        updateUser(id: ID!,input: UserMessageInput): User,
        deleteUser(id: ID!): User
    }
`
class User {
    constructor(id, {name,age}) {
        this.id = id
        this.name = name
        this.age = age
    }
}
const resolvers = {
    Query: {
        getUser(parent, args, context, info) {
            const idx = userList.findIndex(item => item.id === args.id)

            if(idx === -1) {
                throw new Error('user is not exist')
            }

            return userList[idx]
        },
        getList: () => userList
    },
    Mutation: {
        createUser(parent, args, context, info){
            const id = require('crypto').randomBytes(10).toString('hex')
            let createdUser = new User(id,args.input)

            userList.push(createdUser)
            return createdUser
        },
        updateUser(parent, args, context, info){
            
            const updatedUser = new User(args.id,args.input)
            const idx = userList.findIndex(item => item.id === args.id)

            if(idx >= 0) {
                userList[idx] = updatedUser
            }
             
            return updatedUser
        },
        deleteUser(parent, args, context, info) {
            const idx = userList.findIndex(item => item.id === args.id)
            
            if(idx === -1) {
                throw new Error('user is not exist')
            }

            return userList.splice(idx,1)[0]
            
        }
     }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

app.use(Body())

server.applyMiddleware({app})

app.listen(PORT, () => console.log(`server is running at port ${PORT}`))