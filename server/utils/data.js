const mongoose = require("mongoose");

const Pets = [
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548751"),
    name: "Blue",
    email: "blue@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "Parrot",
    species: "Eclectus",
    age: 7,
    location: "Sussex",
    posts: [
      new mongoose.Types.ObjectId("123458795462154796548761"),
      new mongoose.Types.ObjectId("123458795462154796548771"),
    ],
    following: [new mongoose.Types.ObjectId("123458795462154796548752")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548753")],
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/avatars%2F123458795462154796548751_avatar.png?alt=media&token=8ddc359b-98a4-4b99-9ad3-f94cb1a6fbaf",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548752"),
    name: "Tibido",
    email: "tibz@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "Cat",
    species: "Cat",
    age: 2,
    location: "Outside Moncton",
    posts: [new mongoose.Types.ObjectId("123458795462154796548762")],
    following: [new mongoose.Types.ObjectId("123458795462154796548753")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548751")],
    avatar:
      "https://images.unsplash.com/photo-1607923432848-62f872d16daf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548753"),
    name: "Jo",
    email: "jo@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "fish",
    species: "Dog",
    age: 5,
    location: "Halifax",
    posts: [new mongoose.Types.ObjectId("123458795462154796548763")],
    following: [new mongoose.Types.ObjectId("123458795462154796548751")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548752")],
    avatar:
      "https://images.unsplash.com/photo-1591608971376-46e64aa7fd19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
  },
];

const Posts = [
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548761"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548751"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548761.png?alt=media&token=bc59798a-d5e7-4439-99b8-963d2a78e6c7",
    content: "Me watching Birdflix.",

    comments: " ",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548771"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548751"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548771.jpeg?alt=media&token=b284caff-a25c-4855-949a-c029fb67b37a",
    content: "My brother after he left his wife (cheating issues).",

    comments: " ",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548762"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548752"),
    mediaUrl:
      "https://images.unsplash.com/photo-1560743173-567a3b5658b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",

    comments: " ",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548763"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548753"),
    mediaUrl:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    content: "Nice one --> great stuff",

    comments: " ",
  },
];

module.exports = { Pets, Posts };
