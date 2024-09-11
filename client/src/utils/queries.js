import { gql } from "@apollo/client";

// Get all users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      listings {
        _id
        listing_type
        price
        condition
        description
      }
      transactions {
        _id
        transaction_type
        amount
        status
      }
    }
  }
`;

// Get a single user by username
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      favorite_game
      listings {
        _id
        listing_type
        price
        condition
        description
      }
      transactions {
        _id
        transaction_type
        amount
        status
      }
    }
  }
`;

// Get logged-in user's information
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      listings {
        _id
        listing_type
        price
        condition
        description
      }
      transactions {
        _id
        transaction_type
        amount
        status
      }
    }
  }
`;

// Get all listings
export const QUERY_LISTINGS = gql`
  query getListings {
    listings {
      _id
      listing_type
      price
      condition
      description
      user {
        _id
        username
      }
      game {
        _id
        title
      }
    }
  }
`;

// Get listings by a specific user
export const QUERY_LISTINGS_BY_USER = gql`
  query getListingsByUser($username: String!) {
    listingsByUser(username: $username) {
      _id
      listing_type
      price
      condition
      description
      user {
        _id
        username
      }
      game {
        _id
        title
      }
    }
  }
`;

// Get a single listing by ID
export const QUERY_SINGLE_LISTING = gql`
  query getSingleListing($listingId: ID!) {
    listing(listingId: $listingId) {
      _id
      listing_type
      price
      condition
      description
      user {
        _id
        username
      }
      game {
        _id
        title
      }
    }
  }
`;

// Get all transactions
export const QUERY_TRANSACTIONS = gql`
  query getTransactions {
    transactions {
      _id
      listing {
        _id
        game {
          title
        }
      }
      buyer {
        _id
        username
      }
      seller {
        _id
        username
      }
      transaction_type
      amount
      status
    }
  }
`;

// Get transactions by a specific user
export const QUERY_TRANSACTIONS_BY_USER = gql`
  query getTransactionsByUser($username: String!) {
    transactionsByUser(username: $username) {
      _id
      listing {
        _id
        game {
          title
        }
      }
      buyer {
        _id
        username
      }
      seller {
        _id
        username
      }
      trader {
        _id
        username
      }
      transaction_type
      amount
      status
    }
  }
`;

// Get all games
export const QUERY_GAMES = gql`
  query getGames($limit: Int!) {
    games(limit: $limit) {
      _id
      img
      title
      console
      genre
      publisher
      developer
      critic_score
      release_date
    }
  }
`;

// Get a game by title
export const QUERY_SINGLE_GAME = gql`
  query getGameByTitle($title: String!) {
    gameByTitle(title: $title) {
      _id
      img
      title
      console
      genre
      publisher
      developer
      critic_score
      release_date
    }
  }
`;

export const QUERY_ORDER_DETAILS = gql`
  query GetOrderDetails {
    order {
      _id
      totalAmount
    }
  }
`;
