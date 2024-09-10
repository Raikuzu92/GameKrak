import { gql } from "@apollo/client";

// Login a user
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
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
    $bio: String
    $favorite_game: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      bio: $bio
      favorite_game: $favorite_game
    ) {
      token
      user {
        id
        username
      }
    }
  }
`;

// Edit logged-in user
export const EDIT_USER = gql`
  mutation editUser($username: String!) {
    editUser(username: $username) {
      id
      username
      email
      bio
      favorite_game
    }
  }
`;

// Remove a user and their listings
export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      id
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
      id
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
    $id: ID!
    $listing_type: String
    $price: Float
    $condition: String
    $description: String
    $trade_for: String
  ) {
    editListing(
      id: $id
      listing_type: $listing_type
      price: $price
      condition: $condition
      description: $description
      trade_for: $trade_for
    ) {
      id
      listing_type
      price
      condition
      description
    }
  }
`;

// Remove a listing
export const REMOVE_LISTING = gql`
  mutation removeListing($id: ID!) {
    removeListing(id: $id) {
      id
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
      id
      listing {
        id
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
  mutation removeTransaction($id: ID!) {
    removeTransaction(id: $id) {
      id
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
      id
      title
      genre
      publisher
      developer
      release_date
    }
  }
`;
