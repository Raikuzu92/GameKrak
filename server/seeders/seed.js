const db = require("../config/connection");
const { User, Game } = require("../models");
const userSeeds = require("./userSeeds.json");
const gameSeeds = require("./gameData.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Game", "game");

    await cleanDB("User", "users");

    await User.create(userSeeds);

    await Game.create(gameSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
