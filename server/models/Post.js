////////////////////////////////////////////////////////////////////////////////
// Define Mongoose
////////////////////////////////////////////////////////////////////////////////
const { model, Schema } = require("mongoose");
const CommentSchema = require("./Comment");

////////////////////////////////////////////////////////////////////////////////
// Creates the Post schema
////////////////////////////////////////////////////////////////////////////////
const PostSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "Pet", require: true },
    mediaUrl: { type: String, default: "" },
    content: { type: String, require: true, minLength: 1, maxLength: 1000 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

////////////////////////////////////////////////////////////////////////////////
// Creates a virtual that returns the total of reactions
////////////////////////////////////////////////////////////////////////////////
PostSchema.virtual("likes").get(function () {
  return this.likedBy.length;
});

PostSchema.set("toJSON", { virtuals: true });

const Post = model("Post", PostSchema);

module.exports = Post;
