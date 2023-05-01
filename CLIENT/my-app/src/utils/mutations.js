import { gql } from "@apollo/client";

const CREATE_STORE = gql`
  mutation CreateStore($store: StoreInput!) {
    createStore(store: $store) {
      _id
      name
      description
      items {
        _id
        name
        description
      }
    }
  }
`;

const UPDATE_STORE = gql`
  mutation UpdateStore($id: ID!, $store: StoreInput!) {
    updateStore(id: $id, store: $store) {
      _id
      name
      description
      items {
        _id
        name
        description
      }
    }
  }
`;

const DELETE_STORE = gql`
  mutation DeleteStore($id: ID!) {
    deleteStore(id: $id) {
      _id
      name
      description
      items {
        _id
        name
        description
      }
    }
  }
`;

const CREATE_ITEM = gql`
  mutation CreateItem($item: ItemInput!) {
    createItem(item: $item) {
      _id
      name
      description
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $item: ItemInput!) {
    updateItem(id: $id, item: $item) {
      _id
      name
      description
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      _id
      name
      description
    }
  }
`;

const LOGIN = gql`
  mutation Login($store: String!, $password: String!) {
    login(store: $store, password: $password) {
      token
      store {
        _id
        name
        description
        items {
          _id
          name
          description
        }
      }
      isManager
    }
  }
`;

const MANAGER_LOGIN = gql`
  mutation ManagerLogin($store: String!, $managerPass: String!) {
    managerLogin(store: $store, managerPass: $managerPass) {
      token
      store {
        _id
        name
        description
        items {
          _id
          name
          description
        }
      }
      isManager
    }
  }
`;