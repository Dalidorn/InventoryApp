// Dependancies
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { authMiddleware } = require("./config/auth");
const { typeDefs, resolvers } = require("./schemas");
const cors = require("cors");
const dotenv = require("dotenv");

// IMPORTING AUTO SEEDS
const { Item } = require("./models/Item");
const { Store } = require("./models/Store");
const itemSeeds = require("./seeds/defaultItems.json");
const storeSeeds = require("./seeds/defaultStores.json");

// Load .env File
dotenv.config();

// Declare Express Server, Port, ApolloServer, and DB from Atlas connection file
const PORT = process.env.PORT || 4000;
const app = express();
const db = require("./config/connection");
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

// Declare Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();

    db.once("open", async () => {

        // AUTO SEEDING ITEMS WITH DEFAULTS
        // console.log("Dropping database...");
        // await db.dropDatabase();
        // console.log("Database dropped");
        try {
            console.log("Seeding Items");
            await Item.create(itemSeeds);
            console.log("Seeding Stores");
            await Store.create(storeSeeds);
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("Database Seeded");

        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);