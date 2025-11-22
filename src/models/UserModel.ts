import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      requrired: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ProfilePic: {
      type: String,
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;
