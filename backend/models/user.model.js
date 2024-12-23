import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  image: {
    type: String,
    default: "",
  },
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  password: {
    type: String,
    required: true,
    min: 10,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
