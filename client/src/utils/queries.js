import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      listings {
        _id
        listingType
        price
        condition
        description
        game {
          _id
          title
        }
      }
      transactions {
        _id
        transactionType
        amount
        status
        game {
          _id
          title
        }
      }
    }
  }
`;

export const QUERY_LISTINGS = gql`
  query getListings {
    listings {
      _id
      listingType
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
      listingType
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
        listingType
        price
        condition
        description
        game {
          _id
          title
        }
      }
      transactions {
        _id
        transactionType
        amount
        status
        game {
          _id
          title
        }
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

export const QUERY_SELL_ITEMS = gql`
  query getSellItems {
    sellItems {
      _id
      name
      price
      description
    }
  }
`;

export const QUERY_TRADE_ITEMS = gql`
  query getTradeItems {
    tradeItems {
      _id
      name
      tradeFor
      description
    }
  }
`;