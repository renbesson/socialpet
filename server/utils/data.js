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
    type: "Dog",
    species: "Golden Retriever",
    age: 3,
    location: "Moncton",
    posts: [
      new mongoose.Types.ObjectId("123458795462154796548762"),
      new mongoose.Types.ObjectId("123458795462154796548772"),
    ],
    following: [new mongoose.Types.ObjectId("123458795462154796548753")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548751")],
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/avatars%2F123458795462154796548752_avatar.jpeg?alt=media&token=ec13c94d-7cef-46ce-b48c-c06d7e739579",
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
    posts: [
      new mongoose.Types.ObjectId("123458795462154796548763"),
      new mongoose.Types.ObjectId("123458795462154796548773"),
    ],
    following: [new mongoose.Types.ObjectId("123458795462154796548751")],
    followers: [new mongoose.Types.ObjectId("123458795462154796548752")],
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/avatars%2F123458795462154796548753_avatar.jpeg?alt=media&token=9ace4553-db59-4a74-a5a7-da5c8a896e62",
  },
];

const Posts = [
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548761"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548751"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548761.png?alt=media&token=bc59798a-d5e7-4439-99b8-963d2a78e6c7",
    content: "Me watching Birdflix.",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548771"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548751"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548771.jpeg?alt=media&token=b284caff-a25c-4855-949a-c029fb67b37a",
    content: "My brother after he left his wife (cheating issues).",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548762"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548752"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548762.jpeg?alt=media&token=22809c68-eb48-4a0f-a487-93e40a7d151c",
    content: "Nice one --> great stuff",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548772"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548752"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548772.jpeg?alt=media&token=135122a4-8efa-431c-8054-ec547661cfd2",
    content: "Me = Super dog!",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548763"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548753"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548763.jpeg?alt=media&token=1f089933-4dcb-4fbc-91cd-eadba377fe95",
    content: "Just hanginnn...",
  },
  {
    _id: new mongoose.Types.ObjectId("123458795462154796548773"),
    ownerId: new mongoose.Types.ObjectId("123458795462154796548753"),
    mediaUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialpet-ren.appspot.com/o/images%2F123458795462154796548773.jpeg?alt=media&token=02ced35a-7f27-4f51-89f7-6f0bf4a257f5",
    content: "Pose in the wild.",
  },
];

module.exports = { Pets, Posts };
