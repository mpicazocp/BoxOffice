/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose');
const UserModel = require('./user');
const dotenv = require('dotenv');

dotenv.config(); // enable use of variables in .env file


mongoose
    .connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // eslint-disable-next-line comma-dangle
        }
    )
    .catch((error) => console.log(error));


// backend connection to User HTTP GET call, retrieves based on
// User schema attributes
exports.getUsers = async function getUsers(email, pwsd, medList) {
    let result;
    if (email === undefined && pwsd === undefined && medList === undefined) {
        result = await UserModel.find();
    } else if (email) {
        result = await UserModel.find({ email: email });
    } else if (pwsd) {
        result = await UserModel.find({ password: pwsd });
    } else if (medList) {
        result = await UserModel.find({ mediaList: medList });
    }
    return result;
};

// backend function to retrieve User objects by their ID
exports.findUserById = async function findUserById(id) {
    try {
        return await UserModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// backend connection to User HTTP POST call, creates
// a new User object in the DB with the attributes
// from the input parameter
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

// backend connection to User HTTP PATCH Call
exports.patchUser = async function modUser(userId, patchObj) {
    try {
        // find user to patch
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
                // check through all Media pointer objects
                // in the incoming object
                let found = false;
                for (let j = 0; j < userToPatch.mediaList.length; j++) {
                    // check through all Media pointer objects currently
                    // in the target user for any ID matches
                    if (userToPatch.mediaList[j].mediaId ===
                         newMedia[i].mediaId) {
                        // modify/remove existing media document reference
                        if (!updateMediaListEntry(userToPatch, j,
                             newMedia[i])) {
                            // if the matched Media pointer objects are
                            // identical, delete the one stored in the
                            // user's attribute
                            userToPatch.mediaList.splice(j, 1);
                        }
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // if there is no ID match,
                    // add as a new media document reference
                    userToPatch.mediaList.push(newMedia[i]);
                }
            }
        }
        // save changes to the user
        const savedUser = await userToPatch.save();
        return savedUser;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

// helper function to update specific JSON object in list
// eslint-disable-next-line require-jsdoc
function updateMediaListEntry(userToPatch, idx, newObj) {
    let modify = false;
    if (
        userToPatch.mediaList[idx].streamingService !== undefined &&
        userToPatch.mediaList[idx].streamingService != newObj.streamingService
    ) {
        // update the Media pointer object's streamingService attribute
        userToPatch.mediaList[idx].streamingService = newObj.streamingService;
        userToPatch.markModified(`mediaList.${idx}.streamingService`);
        modify = true;
    }
    if (
        userToPatch.mediaList[idx].contentType !== undefined &&
        userToPatch.mediaList[idx].contentType != newObj.contentType
    ) {
        // update the Media pointer object's contentType attribute
        userToPatch.mediaList[idx].contentType = newObj.contentType;
        userToPatch.markModified(`mediaList.${idx}.contentType`);
        modify = true;
    }
    if (
        userToPatch.mediaList[idx].currentSeason !== undefined &&
        userToPatch.mediaList[idx].currentSeason != newObj.currentSeason
    ) {
        // update the Media pointer object's currentSeason attribute
        userToPatch.mediaList[idx].currentSeason = newObj.currentSeason;
        userToPatch.markModified(`mediaList.${idx}.currentSeason`);
        modify = true;
    }
    if (
        userToPatch.mediaList[idx].currentEpisode !== undefined &&
        userToPatch.mediaList[idx].currentEpisode != newObj.currentEpisode
    ) {
        // update the Media pointer object's currentEpisode attribute
        userToPatch.mediaList[idx].currentEpisode = newObj.currentEpisode;
        userToPatch.markModified(`mediaList.${idx}.currentEpisode`);
        modify = true;
    }
    if (
        userToPatch.mediaList[idx].currentHours !== undefined &&
        userToPatch.mediaList[idx].currentHours != newObj.currentHours
    ) {
        // update the Media pointer object's currentHours attribute
        userToPatch.mediaList[idx].currentHours = newObj.currentHours;
        userToPatch.markModified(`mediaList.${idx}.currentHours`);
        modify = true;
    }
    if (
        userToPatch.mediaList[idx].currentMinutes !== undefined &&
        userToPatch.mediaList[idx].currentMinutes != newObj.currentMinutes
    ) {
        // update the Media pointer object's currentMinutes attribute
        userToPatch.mediaList[idx].currentMinutes = newObj.currentMinutes;
        userToPatch.markModified(`mediaList.${idx}.currentMinutes`);
        modify = true;
    }
    if (modify) {
        // if at least one entry was changed, flag to keep the pointer object
        return true;
    } else {
        // if all entries match, flag to delete the pointer object
        return false;
    }
}

// backend connection to User HTTP DELETE call, removes a User
// object based on its ID
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
