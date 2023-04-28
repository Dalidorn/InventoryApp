const { gql } = require("@apollo/server");

const typeDefs = `#gql

    type Item {
        id: ID!
        name: String!
        description: String!
        role: String!
        cost: Float!
        unitSize: Float!
        PAR: Float!
        currentQuantity: Int
        maxQuantity: Int
        image: Image
        lastUpdate: String
    }
    
    type Image {
        data: String
        contentType: String
    }
    
    input ItemInput {
        name: String!
        description: String!
        role: String!
        cost: Float!
        unitSize: Float!
        PAR: Float!
        currentQuantity: Int
        maxQuantity: Int
        image: ImageInput
    }
    
    input ImageInput {
        data: String
        contentType: String
    }
    
    type Query {
        items: [Item!]!
        item(id: ID!): Item
    }
    
    type Mutation {
        createItem(item: ItemInput!): Item!
        updateItem(id: ID!, item: ItemInput!): Item!
        deleteItem(id: ID!): Item
    }

`;

module.exports = typeDefs;