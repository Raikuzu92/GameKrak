import { gql } from "@apollo/client";

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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $bio: String, $favorite_game: String) {
    addUser(username: $username, email: $email, password: $password, bio: $bio, favorite_game: $favorite_game) {
      token
      user {
        _id
        username
      }
    }
  }
`;

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
      _id
      listing_type
      price
      condition
      description
    }
  }
`;

export const REMOVE_LISTING = gql`
  mutation removeListing($id: ID!) {
    removeListing(id: $id) {
      _id
    }
  }
`;

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

export const REMOVE_TRANSACTION = gql`
  mutation removeTransaction($id: ID!) {
    removeTransaction(id: $id) {
      _id
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame(
    $title: String!
    $genre: String!
    $publisher: String!
    $developer: String!
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

// export const UPDATE_GAME = gql`
//   mutation updateGame(
//     $gameId: ID!
//     $title: String
//     $genre: String
//     $publisher: String
//     $developer: String
//     $release_date: String
//     $status: String
//   ) {
//     updateGame(
//       gameId: $gameId
//       title: $title
//       genre: $genre
//       publisher: $publisher
//       developer: $developer
//       release_date: $release_date
//       status: $status
//     ) {
//       _id
//       title
//       genre
//       publisher
//       developer
//       release_date
//       status
//     }
//   }
// `;