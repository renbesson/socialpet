////////////////////////////////////////////////////////////////////////////////
//  Requires
////////////////////////////////////////////////////////////////////////////////
const { model, Schema } = require('mongoose');
const Post = require('./Post');

////////////////////////////////////////////////////////////////////////////////
// Creates the Pet schema
////////////////////////////////////////////////////////////////////////////////
const PetSchema = new Schema(
  {
    name: { type: String, require: true, min: 3, max: 20 },
    email: { type: String, required: true, max: 50, unique: true },
    password: { type: String, required: true, min: 6 },
    avatar: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    type: { type: String, default: '' },
    species: { type: String, default: '' },
    age: { type: Number, default: '' },
    weight: { type: Number, default: '' },
    weightType: { type: String, default: '' },
    location: { type: String, default: '' },
    following: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

module.exports = model('Pet', PetSchema);
