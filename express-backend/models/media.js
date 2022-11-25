const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      contentType: {
        type: String,
        required: true,
        trim: true,
        // validate(value) {
        //   if (value !== 'series' || value !== 'movie') {
        //     throw new Error('Invalid media type.');
        //   }
        // },
      },
      instance_count: {  // legacy attribute
        type: Number,
        required: false,
        trim: true,
        validate(value) {
          if (value < 1) {
            throw new Error('Invalid inst_count, must be at least one.');
          }
        },
      },
      genre: {  // legacy attribute
        type: String,
        required: false,
        trim: true,
      },
      avg_runtime_mins: { // legacy attribute
        type: Number,
        required: false,
        trim: true,
        validate(value) {
          if (value < 1) {
            // eslint-disable-next-line max-len
            throw new Error('Invalid average length, must be at least one minute.');
          }
        },
      },
      streamingService: {
        type: String,
        required: true,
        trim: true,
      },
      img: {  // img url to be rendered
        type: String,
        required: true,
        trim: false,
      },
      desc: { //  description
        type: String,
        required: true,
        trim: true,
      },
    },
    {collection: 'media_list'},
);

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
