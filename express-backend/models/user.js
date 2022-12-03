const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('Invalid password, must be at least 8 characters.');
        } else if (value.length > 20) {
          throw new Error('Invalid password, must be at most 32 characters.');
        }
      },
    },
    mediaList: [],
  },
  { collection: 'user_list' }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
