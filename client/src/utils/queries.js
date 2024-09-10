import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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

export const QUERY_GAMES = gql`
  query getGames {
    games {
      _id
      title
      genre
      publisher
      developer
      release_date
    }
  }
`;
