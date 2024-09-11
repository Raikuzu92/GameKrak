const typeDefs = `

type User {
    _id: ID!
    username: String
    email: String
    password: String
    bio: String
    favorite_game: String
    listings: [ID]
    transactions: [ID] 
  
}

type Game {
    _id: ID!
    img: String
    title: String
    console: String
    genre: String
    publisher: String
    developer: String
    critic_score: String
    total_sales: String
    na_sales: String
    jp_sales: String
    pal_sales: String
    other_sales: String
    release_date: String
    last_update: String
}

type Listing {
    _id: ID!
    game: Game
    user: User
    listing_type: String
    price: Float
    condition: String
    description: String
    trade_for: Game
    created_at: String
    updated_at: String
}

type Transaction {
    _id: ID!
    listing: Listing
    buyer: User
    seller: User
    trader: User
    trade_with: Game
    transaction_type: String
    transaction_date: String
    amount: Float
    status: String
    notes: String
    created_at: String
    updated_at: String
}
    
    
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    listings: [Listing]
    listingsByUser(username: String!): [Listing]
    transactionsByUser(username: String!): [Transaction]
    transactions: [Listing]
    games(limit: Int): [Game]
    gameByTitle(title: String!): Game
  }


  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    editUser(username: String!): User
    removeUser(_id: ID!): User
    addListing(gameId: ID!, user: ID!, listing_type: String!, price: Float!, condition: String!, description: String!, trade_for: String!): Listing
    editListing(_id: ID!, game: ID!, user: ID!, listing_type: String!, price: Float!, condition: String!, description: String!, trade_for: String!): Listing
    removeListing(_id: ID!): Listing
    addTransaction(listingId: ID!, buyerId: ID, sellerId: ID, traderId: ID, trade_with: String, transaction_type: String!, amount: Float, status: String!, notes: String): Transaction
    removeTransaction(_id: ID!): Transaction
    addGame(title: String!, genre: String!, publisher: String, developer: String, release_date: String): Game
    }
    `;
    
    // updateGame(img: String, title: String, console: String, genre: String, publisher: String, developer: String, critic_score: Float, total_sales: Float, na_sales: Float, jp_sales: Float, pal_sales: Float, other_sales: Float, release_date: String, last_update: String): Game
    
    module.exports = typeDefs;
    