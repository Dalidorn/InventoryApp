const { Item } = require("../models");

const resolvers = {

// QUERIES

    Query: {
      items: async () => {
        return await Item.find();
      },
      item: async (parent, args) => {
        return await Item.findById(args.id);
      },
    },

// MUTATIONS

    Mutation: {
      createItem: async (parent, args) => {
        const newItem = new Item(args.item);
        await newItem.save();
        return newItem;
      },
      updateItem: async (parent, args) => {
        const updatedItem = await Item.findByIdAndUpdate(args.id, args.item, { new: true });
        return updatedItem;
      },
      deleteItem: async (parent, args) => {
        const deletedItem = await Item.findByIdAndDelete(args.id);
        return deletedItem;
      },
    },
  };
  
  module.exports = resolvers;