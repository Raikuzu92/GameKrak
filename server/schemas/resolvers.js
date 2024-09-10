const { User, Listing, Game, Transaction } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().populate("listings").populate("transactions");
    },
    // get one user by username
    user: async (parent, { username }) => {
      return User.findOne({ username: username }).populate("listings").populate("transactions");
    },
    // get logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("listings").populate("transactions");
      }
      throw AuthenticationError;
    },
    // get all listings
    listings: async () => {
      return Listing.find().populate("game").populate("user");
    },
    // get all listings for one user
    listingsByUser: async (parent, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      return Listing.find({ user: user._id }).populate("game").populate("user");
    },
    // get all transactions
    transactions: async () => {
      return Transaction.find().populate("listing").populate("buyer").populate("seller").populate("trader").populate("trade_with");
    },
    // get all transactions for one user (anywhere they are buyer, seller, or trader)
    transactionsByUser: async (parent, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      return Transaction.find({
        $or: [
          { buyer: user._id },
          { seller: user._id },
          { trader: user._id },
        ],
      }).populate("listing").populate("buyer").populate("seller").populate("trader").populate("trade_with");
    },
    // get all games and sort by title
    games: async () => {
      return Game.find().sort({ title: 1 }).limit(30);
    },
    // get one game by title
    gameByTitle: async (parent, { title }) => {
      return Game.find({ title: title});
    },
  },

  Mutation: {
    // checks user password, signs and returns JWT if correct
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // creates a new user
    addUser: async (parent, { username, email, password, bio, favorite_game }) => {
      const user = await User.create({ username, email, password, bio, favorite_game });
      const token = signToken(user);
      return { token, user };
    },
    // edits logged in user 
    editUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndUpdate({ _id: context.user._id }, args, { new: true });
      }
      throw AuthenticationError;
    },
    // removes a user and deletes all their listings
    removeUser: async (parent, { id }) => {
      const user = await User.findByIdAndDelete(id);
      if (user) {
        await Listing.deleteMany({ user: id });
      }
      return user;
    },
    // create new listing and add to user
    addListing: async (parent, { gameId, listing_type, price, condition, description, trade_for }, context) => {
      if (context.user) {
        const listing = await Listing.create({
          game: gameId,
          user: context.user._id,
          listing_type,
          price,
          condition,
          description,
          trade_for,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id }, 
          { $addToSet: { listings: listing._id } }
        );
        return listing.populate("game").populate("user");
      }
      throw AuthenticationError;
    },
    // edit listing for logged in user
    editListing: async (parent, { id, ...args }, context) => {
      if (context.user) {
        return Listing.findOneAndUpdate(
          { _id: id, user: context.user._id }, 
          args, 
          { new: true }
        ).populate("game").populate("user");
      }
      throw AuthenticationError;
    },
    // removes a listing from a user
    removeListing: async (parent, { id }, context) => {
      if (context.user) {
        const listing = await Listing.findOneAndDelete({ _id: id, user: context.user._id });
        if (listing) {
          await User.findByIdAndUpdate({ _id: context.user._id }, { $pull: { listings: id } });
        }
        return listing;
      }
      throw AuthenticationError;
    },
    // adds a transaction to a user
    addTransaction: async (parent, { listingId, buyerId, sellerId, traderId, trade_with, transaction_type, amount, status, notes }, context) => {
      if (context.user) {
        const transaction = await Transaction.create({
          listing: listingId,
          buyer: buyerId,
          seller: sellerId,
          trader: traderId,
          trade_with,
          transaction_type,
          amount,
          status,
          notes,
        });
        await User.findByIdAndUpdate({ _id: buyerId }, { $push: { transactions: transaction._id } });
        await User.findByIdAndUpdate({ _id: sellerId }, { $push: { transactions: transaction._id } });
        if (traderId) {
          await User.findByIdAndUpdate({ _id: traderId }, { $push: { transactions: transaction._id } });
        }
        return transaction.populate("listing").populate("buyer").populate("seller").populate("trader").populate("trade_with");
      }
      throw AuthenticationError;
    },
    // removes a transaction from a user
    removeTransaction: async (parent, { id }, context) => {
      if (context.user) {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (transaction) {
          await User.findByIdAndUpdate({ _id: transaction.buyer }, { $pull: { transactions: id } });
          await User.findByIdAndUpdate({ _id: transaction.seller }, { $pull: { transactions: id } });
          if (transaction.trader) {
            await User.findByIdAndUpdate({ _id: transaction.trader }, { $pull: { transactions: id } });
          }
        }
        return transaction;
      }
      throw AuthenticationError;
    },
    // add a new game
    addGame: async (parent, { title, genre, publisher, developer, release_date }) => {
      const game = await Game.create({
        title,
        genre,
        publisher,
        developer,
        release_date,
      });

      return game;
    },
  },
};

module.exports = resolvers;
