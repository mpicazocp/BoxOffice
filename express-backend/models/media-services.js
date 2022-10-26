const mongoose = require("mongoose");
const mediaModel = require("./media");
mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/boxoffice", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getMedia(name, type, ) {
  let result;
  if (name === undefined && type === undefined) {
    result = await mediaModel.find();
  } else if (name && !type) {
    result = await findMediaByName(name);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function findUserByNameAndJob(name, job) {
  return await userModel.find({ name : name, job : job });
}

exports.findByIdAndDelete = async function findByIdAndDelete(id) {
  try {
    const result = await userModel.findByIdAndDelete(id);
    console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;

