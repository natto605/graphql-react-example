const {SERVER_ADDRESS} =  require( "../config");
const rq = require('request-promise');

const { GraphQLScalarType } = require('graphql');
const { gql } = require('apollo-server-koa');
const { Kind } = require('graphql/language');


const typeDefs = gql`
    type Discount {
        
    }
    type payloadMap {
        id: String
    }
    
    type ReturnValue {
        code: String,
        msg: String,
    }
    
    input Params {
        taskId: String,
        yearPeriod: String!,
        season: String,
        subCate: String,
        productGroup: Int,
        brandCode: String
    }
    
    type Query {
        getStocking: ReturnValue!
    }
    
    type Mutation {
        stocking(input: [Params]): ReturnValue
    }
`

const resolvers = {
    Query: {
        getStocking(parent, args, context, info) {
            console.log(context);

            return {msg: "ok", code: "0"}
        }
    },

    Mutation: {
        async stocking(parent, args, context, info) {
            const year = args.year;
            const params = [
                {
                    "taskId": "",
                    "yearPeriod": "2019/10A,2019/10B,2019/10C,2019/10A ,2019/11A,2019/11B",
                    "season": "",
                    "subCate": "",
                    "productGroup": 1,
                    "brandCode":"3"
                }
            ];
            const url = `/api/supplementary/stocking/productAverageDrop?brandCode=3&discountRange=5.00-7.00`;
            const options = {
                url: SERVER_ADDRESS + url,
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: params,
                json: true
            };

            let result = await rq(options);

            return result;
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};