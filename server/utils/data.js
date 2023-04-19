const mongoose = require("mongoose");

const Pets = [
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548751"),
    name: "Anna",
    email: "anna@gmail.com",
    password: "$2a$10$VM35l839cEbwR75FpMTu.OpDsFORU2go4vrs3xtOIsnGhOV87Bjwe",
    type: "Dog",
    species: "Dog",
    age: 2,
    location: "Moncton",
    posts: [
      new mongoose.Types.ObjectId("123458795462154796548761"),
      new mongoose.Types.ObjectId("123458795462154796548771"),
    ],
    following: [new mongoose.Types.ObjectId("123458795462154796548752")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548753")],
    avatar:
      "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60 ",
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
    following: [new mongoose.Types.ObjectId("123458795462154796548751")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548753")],
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
      "https://images.unsplash.com/photo-1591608971376-46e64aa7fd19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    content: "Amzaing",

    comments: " ",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548771"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548751"),
    mediaUrl:
      "https://www.google.com/url?sa=i&url=http%3A%2F%2Ft1.gstatic.com%2Flicensed-image%3Fq%3Dtbn%3AANd9GcS_9i-kxwPsZenCXAF1NkQSwbd5pHXR3usdHV3YxvkMxSJn3DZd6T_kMEtLiW63fvAPsa3JqHPgFagNHyE&psig=AOvVaw10IZxVWcon7dA60zSlLs5c&ust=1681943086443000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNiRj7O8tP4CFQAAAAAdAAAAABAE",
    content: "Amzaing",

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
