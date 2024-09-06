const typeDefs = `

type Game {
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
    transactions(username: String): [Transaction]
    game(gameId: ID!): Game
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTransaction(id: ID!, listing: Listing, buyer: User, seller: User, trader: User, trade_with: Game, transaction_type: String, transaction_date: String
    amount: Float, status: String, notes: String, created_at: String, updated_at: String): Transaction
    updateGame(img: String, title: String, console: String, genre: String, publisher: String, developer: String, critic_score: Float, total_sales: Float, na_sales: Float, jp_sales: Float, pal_sales: Float, other_sales: Float, release_date: String, last_update: String): Monster,   removeMonster(monsterId: ID!): Game
    
  }
`;

module.exports = typeDefs;
