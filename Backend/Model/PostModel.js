import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: [String],
  },
  comments: {
    type: [String],
  },
});

export default mongoose.model("Post", postSchema);
