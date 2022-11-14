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
    }
  )
  .catch((error) => console.log(error));

exports.getUsers = async function getUsers(email, pwsd, medList) {
  let result;
  if (email === undefined && pwsd === undefined && medList === undefined) {
    result = await UserModel.find();
  } else if (email) {
    result = await UserModel.find({ email: email });
  } else if (pwsd) {
    result = await UserModel.find({ password: pwsd });
  } else if (medList) {
    result = await UserModel.find({ media_list: medList });
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

exports.patchUser = async function modUser(userId, patchObj) {
  try {
    const userToPatch = await UserModel.findById(userId);
    const newEmail = patchObj['email'];
    if (newEmail) {
      // change email
      userToPatch.email = newEmail;
    }
    const newPswd = patchObj['password'];
    if (newPswd) {
      // change password
      userToPatch.password = newPswd;
    }
    const newMedia = patchObj['media_list'];
    if (newMedia) {
      // add/remove media document references
      for (let i = 0; i < newMedia.length; i++) {
        if (userToPatch.media_list.includes(newMedia[i])) {
          // remove existing media document reference
          const index = userToPatch.media_list.indexOf(newMedia[i]);
          if (index > -1) {
            userToPatch.media_list.splice(index, 1);
          }
        } else {
          // add new media document reference
          userToPatch.media_list.push(newMedia[i]);
        }
      }
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
