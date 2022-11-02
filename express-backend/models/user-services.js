const mongoose = require('mongoose');
const UserModel = require('./user');
mongoose.set('debug', true);

mongoose
    .connect('mongodb://localhost:27017/boxoffice', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

exports.getUsers = async function getUsers(email, pwsd) {
  let result;
  if (email === undefined && pwsd === undefined) {
    result = await UserModel.find();
  } else if (email) {
    result = await UserModel.find({email: email});
  } else if (pwsd) {
    result = await UserModel.find({password: pwsd});
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

exports.addMedia = async function addMedia() {
  try {
    console.log('Tests');
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