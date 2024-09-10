import { gql } from "@apollo/client";

// Login a user
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Add a new user
export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Edit logged-in user
export const EDIT_USER = gql`
  mutation editUser($username: String!) {
    editUser(username: $username) {
      _id
      username
      email
      bio
      favorite_game
    }
  }
`;

// Remove a user and their listings
export const REMOVE_USER = gql`
  mutation removeUser($_id: ID!) {
    removeUser(_id: $_id) {
      _id
      username
    }
  }
`;

// Add a new listing
export const ADD_LISTING = gql`
  mutation addListing(
    $gameId: ID!
    $listing_type: String!
    $price: Float
    $condition: String!
    $description: String
    $trade_for: String
  ) {
    addListing(
      gameId: $gameId
      listing_type: $listing_type
      price: $price
      condition: $condition
      description: $description
      trade_for: $trade_for
    ) {
      _id
      listing_type
      price
      condition
      description
      trade_for
      game {
        title
      }
    }
  }
`;

// Edit a listing for the logged-in user
export const EDIT_LISTING = gql`
  mutation editListing(
    $_id: ID!
    $listing_type: String
    $price: Float
    $condition: String
    $description: String
    $trade_for: String
  ) {
    editListing(
      _id: $_id
      listing_type: $listing_type
      price: $price
      condition: $condition
      description: $description
      trade_for: $trade_for
    ) {
      _id
      listing_type
      price
      condition
      description
    }
  }
`;

// Remove a listing
export const REMOVE_LISTING = gql`
  mutation removeListing($_id: ID!) {
    removeListing(_id: $_id) {
      _id
    }
  }
`;

// Add a transaction
export const ADD_TRANSACTION = gql`
  mutation addTransaction(
    $listingId: ID!
    $buyerId: ID
    $sellerId: ID!
    $traderId: ID
    $trade_with: ID
    $transaction_type: String!
    $amount: Float!
    $status: String!
    $notes: String
  ) {
    addTransaction(
      listingId: $listingId
      buyerId: $buyerId
      sellerId: $sellerId
      traderId: $traderId
      trade_with: $trade_with
      transaction_type: $transaction_type
      amount: $amount
      status: $status
      notes: $notes
    ) {
      _id
      listing {
        _id
        game {
          title
        }
      }
      amount
      status
      transaction_type
    }
  }
`;

// Remove a transaction
export const REMOVE_TRANSACTION = gql`
  mutation removeTransaction($_id: ID!) {
    removeTransaction(_id: $_id) {
      _id
    }
  }
`;

// Add a new game
export const ADD_GAME = gql`
  mutation addGame(
    $title: String!
    $genre: String!
    $publisher: String
    $developer: String
    $release_date: String
  ) {
    addGame(
      title: $title
      genre: $genre
      publisher: $publisher
      developer: $developer
      release_date: $release_date
    ) {
      _id
      title
      genre
      publisher
      developer
      release_date
    }
  }
`;
