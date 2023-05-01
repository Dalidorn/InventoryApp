import { gql } from "@apollo/client";

const GET_STORES = gql`
  query GetStores {
    stores {
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

const GET_STORE = gql`
  query GetStore($id: ID!) {
    store(id: $id) {
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

const GET_ITEMS = gql`
  query GetItems {
    items {
      _id
      name
      description
    }
  }
`;

const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      _id
      name
      description
    }
  }
`;
