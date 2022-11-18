/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const mongoose = require('mongoose');
const MediaModel = require('./media');
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

exports.getMedia = async function getMedia(name, type, genre, strmSrv) {
  let result;
  if (name === undefined && type === undefined &&
          genre === undefined && strmSrv === undefined) {
    result = await MediaModel.find();
  } else if (name) {
    result = await MediaModel.find({ name: name });
  } else if (type) {
    result = await MediaModel.find({ content_type: type });
  } else if (genre) {
    result = await MediaModel.find({ genre: genre });
  } else if (strmSrv) {
    result = await MediaModel.find({ strm_srv: strmSrv });
  }
  return result;
};

exports.findMediaById = async function findMediaById(id) {
  try {
    return await mediaModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

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
