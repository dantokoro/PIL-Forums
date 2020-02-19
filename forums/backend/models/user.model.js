const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
      type: String,
      required: true,
      minlength: 6
  },
  avatar_url: {
    type: String,
    default: "https://cdn1.iconfinder.com/data/icons/office-222/91/General_Office_33-512.png"
  },
  email: String,
  star: {
      type: Number,
      enum: [0, 1, 2 ,3 ,4 ,5],
      default: 0
  },
  admin: {
      type: Boolean,
      default: false
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;