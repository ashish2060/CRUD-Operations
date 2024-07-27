import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Hobbies: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
