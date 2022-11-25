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
    const newMedia = patchObj['mediaList'];
    if (newMedia) {
      // add/remove media document references
      for (let i = 0; i < newMedia.length; i++) {
        for (let j = 0; j < userToPatch.mediaList.length; j++)  {
          if (userToPatch.mediaList[j].mediaId === newMedia[i].mediaId) {
            // modify/remove existing media document reference
            if (!updateMediaListEntry(userToPatch.mediaList[j], newMedia[i].mediaId)) {
              userToPatch.mediaList.splice(j, 1);
            }
            break;
          }
        }
        if (j === userToPatch.mediaList.length) {
          // add new media document reference
          userToPatch.mediaList.push(newMedia[i]);
        }
      }
    }
    const savedUser = await userToPatch.save();
    return savedUser;
  } catch (error) {
    console.log(error);
  }
};

// helper function to update specific JSON object in list
function updateMediaListEntry(oldObj, newObj) {
  if (oldObj.currentSeason && oldObj.currentSeason != newObj.currentSeason) {
    oldObj.currentSeason = newObj.currentSeason;
    return true;
  } else if (oldObj.currentEpisode && oldObj.currentEpisode != newObj.currentEpisode) {
    oldObj.currentEpisode = newObj.currentEpisode;
    return true;
  } else if (oldObj.currentHours && oldObj.currentHours != newObj.currentHours) {
    oldObj.currentHours = newObj.currentHours;
    return true;
  } else if (oldObj.currentMinutes && oldObj.currentMinutes != newObj.currentMinutes) {
    oldObj.currentMinutes = newObj.currentMinutes;
    return true;
  } else {
    // if all entries match, delete the pointer JSON object
    return false;
  }
}

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
