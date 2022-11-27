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
      // eslint-disable-next-line comma-dangle
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
        let found = false;
        for (let j = 0; j < userToPatch.mediaList.length; j++) {
          if (userToPatch.mediaList[j].mediaId === newMedia[i].mediaId) {
            // modify/remove existing media document reference
            if (!updateMediaListEntry(userToPatch, j, newMedia[i])) {
              userToPatch.mediaList.splice(j, 1);
            }
            found = true;
            break;
          }
        }
        if (!found) {
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
// eslint-disable-next-line require-jsdoc
function updateMediaListEntry(userToPatch, idx, newObj) {
  let modify = false;
  if (
    userToPatch.mediaList[idx].currentSeason !== undefined &&
    userToPatch.mediaList[idx].currentSeason != newObj.currentSeason
  ) {
    userToPatch.mediaList[idx].currentSeason = newObj.currentSeason;
    userToPatch.markModified(`mediaList.${idx}.currentSeason`);
    modify = true;
  }
  if (
    userToPatch.mediaList[idx].currentEpisode !== undefined &&
    userToPatch.mediaList[idx].currentEpisode != newObj.currentEpisode
  ) {
    userToPatch.mediaList[idx].currentEpisode = newObj.currentEpisode;
    userToPatch.markModified(`mediaList.${idx}.currentEpisode`);
    modify = true;
  }
  if (
    userToPatch.mediaList[idx].currentHours !== undefined &&
    userToPatch.mediaList[idx].currentHours != newObj.currentHours
  ) {
    userToPatch.mediaList[idx].currentHours = newObj.currentHours;
    userToPatch.markModified(`mediaList.${idx}.currentHours`);
    modify = true;
  }
  if (
    userToPatch.mediaList[idx].currentMinutes !== undefined &&
    userToPatch.mediaList[idx].currentMinutes != newObj.currentMinutes
  ) {
    userToPatch.mediaList[idx].currentMinutes = newObj.currentMinutes;
    userToPatch.markModified(`mediaList.${idx}.currentMinutes`);
    modify = true;
  }
  if (modify) {
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
