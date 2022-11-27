/* eslint-disable max-len */
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
      // eslint-disable-next-line comma-dangle
    }
  )
  .catch((error) => console.log(error));

exports.getMedia = async function getMedia(name, type, strmSrv, img, desc) {
  let result;
  if (name === undefined && type === undefined && strmSrv === undefined && img === undefined && desc === undefined) {
    result = await MediaModel.find();
  } else if (name) {
    result = await MediaModel.find({ name: name });
  } else if (type) {
    result = await MediaModel.find({ contentType: type });
  } else if (strmSrv) {
    result = await MediaModel.find({ streamingService: strmSrv });
  } else if (img) {
    result = await MediaModel.find({ img: img });
  } else if (desc) {
    result = await MediaModel.find({ desc: desc });
  }
  return result;
};

exports.findMediaById = async function findMediaById(id) {
  try {
    return await MediaModel.findById(id);
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
