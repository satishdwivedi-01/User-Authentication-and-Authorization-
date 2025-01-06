import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"], // Correct message for username
  },
  email: {
    type: String,
    required: true,
    minlength: [12, "Email must be at least 12 characters long"], // Correct message for email
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"], // Correct message for password
  },
});

const User = mongoose.model("User", userSchema);

export default User;

