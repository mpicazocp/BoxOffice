/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose');
const UserModel = require('./user');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('debug', true);

mongoose
  .connect(
    process.env.MONGODB_URI,
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true, // useFindAndModify: false,
      useUnifiedTopology: true,
    },
  )
  .catch((error) => console.log(error));

exports.getUsers = async function getUsers(email, pwsd) {
  let result;
  if (email === undefined && pwsd === undefined) {
    result = await UserModel.find();
  } else if (email) {
    result = await UserModel.find({ email: email });
  } else if (pwsd) {
    result = await UserModel.find({ password: pwsd });
  }
  return result;
};

exports.findUserById = async function findUserById(id) {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

exports.addUser = async function addUser(user) {
  try {
    const userToAdd = new UserModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

exports.patchUserMedia = async function addMedia(userId, mediaId) {
  try {
    const userToPatch = await UserModel.findById(userId);
    if (mediaId) {
      // remove existing media document reference
      userToPatch.media_list = userToPatch.media_list.filter(({ medId }) =>
          medId !== mediaId);
    } else {
      // add new media document reference
      userToPatch.media_list.push(mediaId);
    }
    const savedUser = await userToPatch.save();
    return savedUser;
  } catch (error) {
    console.log(error);
  }
};

exports.findByIdAndDelete = async function findByIdAndDelete(id) {
  try {
    const result = await UserModel.findByIdAndDelete(id);
    console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
