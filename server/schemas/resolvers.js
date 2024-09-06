const { User, Game } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("game");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("monsters");
    },
    game : async () => {
      return Game.find().sort({ name: 1 });
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("comments");
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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
    addGame: async (parent, { gameName, genre, publisher, developer }) => {
      const game = await Game.create({
        gameName,
        genre,
        publisher,
        developer,
      });

      return Game;
    },
    addComment: async (parent, { GameId, commentText }, context) => {
      if (context.user) {
        return Game.findOneAndUpdate(
          { _id: GameId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeGame: async (parent, { gameId }, context) => {
      const monster = await Game.findOneAndDelete({
        _id: gameId,
      });

      return Game;
    },
    removeComment: async (parent, { GameId, commentId }, context) => {
      if (context.user) {
        return Game.findOneAndUpdate(
          { _id: GameId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
    updateComment: async (parent, { gameId, commentId, commentText }) => {
      return Game.findOneAndUpdate(
        { _id: gameId, "comments._id": commentId },
        { $set: { "comments.$.commentText": commentText } },
        { new: true }
      );
    },
    updateGame: async (
      parent,
      { gameId, gameName, genre, developer, publisher }
    ) => {
      const updateFields = {};
      if (gameName) updateFields.gameName = gameName;
      if (genre) updateFields.genre= genre;
      if (developer) updateFields.developer = developer;
      if (publisher) updateFields.publisher = publisher;

      return Monster.findOneAndUpdate(
        { _id: gameId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
