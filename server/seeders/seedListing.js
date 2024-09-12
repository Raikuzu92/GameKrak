const db = require("../config/connection");
const { Listing } = require("../models");
const listingSeeds = require("./listingSeeds.json");

db.once("open", async () => {
  try {
    // Seed the Listing model with the data from listingSeeds.json
    await Listing.create(listingSeeds);

    console.log("Listings have been successfully seeded!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});