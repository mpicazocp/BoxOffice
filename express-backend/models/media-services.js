/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const mongoose = require('mongoose');
const MediaModel = require('./media');
const dotenv = require('dotenv');

dotenv.config(); // enable use of variables in .env file

mongoose
  .connect(
    process.env.MONGODB_URI,
    // "mongodb://localhost:27017/users",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // eslint-disable-next-line comma-dangle
    }
  )
  .catch((error) => console.log(error));

// backend connection to Media HTTP GET call, retrieves based on
// Media schema attributes
exports.getMedia = async function getMedia(name, img, desc) {
  let result;
  if (name === undefined && img === undefined && desc === undefined) {
    result = await MediaModel.find();
  } else if (name) {
    result = await MediaModel.find({ name: name });
  } else if (img) {
    result = await MediaModel.find({ img: img });
  } else if (desc) {
    result = await MediaModel.find({ desc: desc });
  }
  return result;
};

// backend function to retrieve Media objects by their ID
exports.findMediaById = async function findMediaById(id) {
  try {
    return await MediaModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// backend connection to Media HTTP POST call, creates
// a new Media object in the DB with the attributes
// from the input parameter
exports.addMedia = async function addMedia(media) {
  try {
    const mediaToAdd = new MediaModel(media);
    const savedMedia = await mediaToAdd.save();
    return savedMedia;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// backend connection to Media HTTP DELETE call, removes a Media
// object based on its ID
exports.findByIdAndDelete = async function findByIdAndDelete(id) {
  try {
    const result = await MediaModel.findByIdAndDelete(id);
    console.log(JSON.stringify(result));
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
