import mongoose from 'mongoose'
const { Schema, model } = mongoose;
import bcrypt from 'bcrypt'
const userSchema  = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema .pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const UserModel = model("User", userSchema );

export default UserModel
