const typeDefs = `

type User {
    id: ID!
    username: String
    email: String
    password: String
    bio: String
    favorite_game: String
    listings: [ID]
    transactions: [ID] 
  
}

type Game {
    id: ID!
    img: String
    title: String
    console: String
    genre: String
    publisher: String
    developer: String
    critic_score: Float
    total_sales: Float
    na_sales: Float
    jp_sales: Float
    pal_sales: Float
    other_sales: Float
    release_date: String
    last_update: String
}

type Listing {
    id: ID!
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
    id: ID!
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
    game(gameId: ID!): Game
    me: User
    listings: [Listing]
    listingsByUser(username: String!): [Listing]
    transactionsByUser(username: String!): [Transaction]
    transactions: [Listing]
    games: [Game]
    gameByTitle(title: String!): [Game]
  }


  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    amount: Float, status: String, notes: String, created_at: String, updated_at: String): Transaction
    updateGame(img: String, title: String, console: String, genre: String, publisher: String, developer: String, critic_score: Float, total_sales: Float, na_sales: Float, jp_sales: Float, pal_sales: Float, other_sales: Float, release_date: String, last_update: String): Game
    removeGame(GameId: ID!): Game
    editUser(username: String!): User
    removeUser(id: ID!): User
    addListing(game: ID!, user: ID!, listing_type: String!, price: Float!, condition: String!, description: String!, trade_for: String!): Listing
    editListing(id: ID!, game: ID!, user: ID!, listing_type: String!, price: Float!, condition: String!, description: String!, trade_for: String!): Listing
    removeListing(id: ID!): Listing
    addTransactions(listing: ID!, buyer: ID, seller: ID, trade: ID, trade_with: String, transaction_type: String!, amount: Float, status: String!, notes: String): Transaction
    removeTransaction(id: ID!): Transaction
    addGame(id: ID!, genre: String!, publisher: String, developer: String, release_date: String): Game
  }
`;

module.exports = typeDefs;
