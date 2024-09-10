import { gql } from "@apollo/client";

// Get all users
export const QUERY_USERS = gql`
  query getUsers {
    users {
      id
      username
      email
      listings {
        id
        listing_type
        price
        condition
        description
      }
      transactions {
        id
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
      id
      username
      email
      bio
      favorite_game
      listings {
        id
        listing_type
        price
        condition
        description
      }
      transactions {
        id
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
      id
      username
      email
      listings {
        id
        listing_type
        price
        condition
        description
      }
      transactions {
        id
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
      id
      listing_type
      price
      condition
      description
      user {
        id
        username
      }
      game {
        id
        title
      }
    }
  }
`;

// Get listings by a specific user
export const QUERY_LISTINGS_BY_USER = gql`
  query getListingsByUser($username: String!) {
    listingsByUser(username: $username) {
      id
      listing_type
      price
      condition
      description
      user {
        id
        username
      }
      game {
        id
        title
      }
    }
  }
`;

// Get a single listing by ID
export const QUERY_SINGLE_LISTING = gql`
  query getSingleListing($listingId: ID!) {
    listing(listingId: $listingId) {
      id
      listing_type
      price
      condition
      description
      user {
        id
        username
      }
      game {
        id
        title
      }
    }
  }
`;

// Get all transactions
export const QUERY_TRANSACTIONS = gql`
  query getTransactions {
    transactions {
      id
      listing {
        id
        game {
          title
        }
      }
      buyer {
        id
        username
      }
      seller {
        id
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
      id
      listing {
        id
        game {
          title
        }
      }
      buyer {
        id
        username
      }
      seller {
        id
        username
      }
      trader {
        id
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
  query getGames {
    games {
      id
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
      id
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
