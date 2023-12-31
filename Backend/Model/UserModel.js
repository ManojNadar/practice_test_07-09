import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Buyer", "Seller", "Admin"],
    default: "Buyer",
  },
  number: {
    type: Number,
    required: true,
  },
  isNumberVerified: {
    type: Boolean,
    default: false,
  },
  otpForNumberVerification: {
    type: String,
  },
  cart: {
    type: [String],
  },
  wishlist: {
    type: [String],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  friendRequests: {
    type: [String],
  },
  myFriendsList: {
    type: [String],
  },
  profile: {
    type: String,
  },
});

export default mongoose.model("user", userSchema);
