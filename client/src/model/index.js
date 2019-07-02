import { gql } from 'apollo-boost'

export const GETLIST = gql`{
    getList{
        id,
        name,
        age
    }
}
`
export const GETUSER = gql`
    query getUser($id: ID!){
        getUser(id: $id) {
            id,
            name,
            age
        }
    }
`

export const create_user = gql`
    mutation CreateUser($name: String!, $age: Int){
        createUser(input: {name: $name, age: $age}) {
            id,
            name,
            age
        }
    }
`

export const update_user = gql`
    mutation updateUser($id: ID!, $name: String!, $age: Int){
        updateUser(id: $id, input: {name: $name, age: $age}) {
            id,
            name,
            age
        }
    }
`

export const delete_user = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id,
            name,
            age
        }
    }
`