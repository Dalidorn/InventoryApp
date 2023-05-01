import { gql } from "@apollo/client";

export const GET_STORES = gql`
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

export const GET_STORE = gql`
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

export const GET_ITEMS = gql`
  query GetItems {
    items {
      _id
      name
      description
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      _id
      name
      description
    }
  }
`;
