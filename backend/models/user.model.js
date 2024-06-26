import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "    name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: 6,
    },
    phone: {
      unique: [true, "you already have an account with this phone "],
      type: String,
      required: [true, "phone is required"]
    },
    address: {
      type: String,
      maxlength: [250, "address too long"],
      trim: true,
      default: "",
    },
    cart: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
