const { Store, Item } = require("../models");

const resolvers = {

  Query: {

    // STORE
    stores: async () => {
      const stores = await Store.find().populate("items");
      return stores;
    },
    store: async (parent, { id }) => {
      const store = await Store.findById(id).populate("items");
      return store;
    },

    // ITEM
    items: async () => {
      const items = await Item.find();
      return items;
    },
    item: async (parent, { id }) => {
      const item = await Item.findById(id);
      return item;
    },
  },

  Mutation: {

    // STORE
    createStore: async (parent, { store }) => {
      const newStore = await Store.create(store);
      return newStore;
    },
    updateStore: async (parent, { id, store }) => {
      const updatedStore = await Store.findByIdAndUpdate(id, store, { new: true }).populate("items");
      return updatedStore;
    },
    deleteStore: async (parent, { id }) => {
      const deletedStore = await Store.findByIdAndDelete(id).populate("items");
      return deletedStore;
    },

    // ITEM
    createItem: async (parent, { item }) => {
      const newItem = await Item.create(item);
      return newItem;
    },
    updateItem: async (parent, { id, item }) => {
      const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
      return updatedItem;
    },
    deleteItem: async (parent, { id }) => {
      const deletedItem = await Item.findByIdAndDelete(id);
      return deletedItem;
    },

    // LOGIN HANDLING
    login: async (parent, { store, password }) => {
      const foundStore = await Store.findOne({ name: store });
      const correctPassword = await foundStore.isCorrectPassword(password);
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
      const token = auth.signToken({ store: foundStore.name, _id: foundStore._id });
      return { token, store: foundStore, isManager: false };
    },
    managerLogin: async (parent, { store, managerPass }) => {
      const foundStore = await Store.findOne({ name: store });
      const correctPassword = await foundStore.isCorrectManagerPassword(managerPass);
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
      const token = auth.signToken({ store: foundStore.name, _id: foundStore._id, isManager: true });
      return { token, store: foundStore, isManager: true };
    },
  },
};

module.exports = resolvers;