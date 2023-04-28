const { gql } = require("@apollo/server");

const typeDefs = `#gql

# TYPES -------------------------------

    type Store {
        id: ID!
        name: String!
        address: String!
        role: String!
        contactPhone: Float!
        contactEmail: String!
        password: String!
        managerPass: String!
        items: [Item!]!
        image: Image
    }

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

    type Auth {
        token: ID!
        store: Store!
        isManager: Boolean!
      }
    
# INPUTS -------------------------------

    input StoreInput {
        name: String!
        address: String!
        role: String!
        contactPhone: Float!
        contactEmail: String!
        password: String!
        managerPass: String!
        items: [ID!]
        image: ImageInput
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
    
# QUERIES -------------------------------

    type Query {
        stores: [Store!]!
        store(id: ID!): Store
        items: [Item!]!
        item(id: ID!): Item
    }
    
# MUTATIONS -----------------------------

    type Mutation {
        createStore(store: StoreInput!): Store!
        updateStore(id: ID!, store: StoreInput!): Store!
        deleteStore(id: ID!): Store
        login(store: String!, password: String!): Auth
        managerLogin(store: String!, managerPass: String!): Auth
        createItem(item: ItemInput!): Item!
        updateItem(id: ID!, item: ItemInput!): Item!
        deleteItem(id: ID!): Item
    }

`;

module.exports = typeDefs;