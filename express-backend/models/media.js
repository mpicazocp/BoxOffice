const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      content_type: {
        type: String,
        required: true,
        trim: true,
        // validate(value) {
        //   if (value !== 'series' || value !== 'movie') {
        //     throw new Error('Invalid media type.');
        //   }
        // },
      },
      instance_count: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
          if (value < 1) {
            throw new Error('Invalid inst_count, must be at least one.');
          }
        },
      },
      genre: {
        type: String,
        required: true,
        trim: true,
      },
      avg_runtime_mins: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
          if (value < 1) {
            // eslint-disable-next-line max-len
            throw new Error('Invalid average length, must be at least one minute.');
          }
        },
      },
      strm_srv: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {collection: 'media_list'},
);

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
