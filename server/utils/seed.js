const connection = require("../config/dbConnection");
let { Pet } = require("../models/Pet");
let { Post } = require("../models/Post");
const { Pets, Posts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  //   //   // Drop existing pets
  //   await Pet.deleteMany({});

  //   //   // Drop existing posts
  //   //   await Post.deleteMany({});

  // Add pets to the collection and await the results
  //   await Pet.collection.insertMany(Pets);

  //   // Add pets to the collection and await the results
  //   await Post.collection.insertMany(Posts);

  //   // Log out the seed data to indicate what should appear in the database
  //   console.table(Pets);
  //   console.table(Posts);
  //   console.info("Seeding complete! 🌱");

  //   process.exit(0);
});
