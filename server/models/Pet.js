////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const { model, models, Schema } = require('mongoose');
const Post = require('./Post');

////////////////////////////////////////////////////////////////////////////////
//  Creates the Pet schema
////////////////////////////////////////////////////////////////////////////////
const PetSchema = new Schema(
  {
    name: { type: String, require: true, min: 3, max: 20 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    avatar: { type: String },
    coverImage: { type: String },
    type: { type: String },
    species: { type: String },
    age: { type: Number },
    weight: { type: Number },
    weightType: { type: String },
    location: { type: String },
    following: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

////////////////////////////////////////////////////////////////////////////////
//  Ensures the email is unique upon creation
////////////////////////////////////////////////////////////////////////////////
PetSchema.path('email').validate(async (email) => {
  const emailFind = await models.Pet.findOne({ email });
  return emailFind ? false : true;
}, 'Email is already being used.');

module.exports = model('Pet', PetSchema);
