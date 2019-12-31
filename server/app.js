const Koa = require("koa");
const Body = require('koa-bodyparser');
const { ApolloServer } = require('apollo-server-koa');

const {typeDefs,resolvers} = require("./graphql/schema");

const app = new Koa();
const PORT = 8001;


const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.use(Body());

server.applyMiddleware({app});

app.listen(PORT, () => console.log(`server is running at port ${PORT}`));