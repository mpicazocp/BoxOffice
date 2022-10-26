const mongoose = require("mongoose");

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
      validate(value) {
        if(value !== "show" || value !== "movie")
            throw new Error("Invalid type, media must be a show or a movie."); 
      },
    },
    inst_count: {
      type: Number,
      required: true,
      trim: true,
      validate(value) {
        if(value < 1)
            throw new Error("Invalid inst_count, must be at least one.");
      },
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        // TODO
      },
    },
    avg_min: {
      type: Number,
      required: true,
      trim: true,
      validate(value) {
        if(value < 1)
            throw new Error("Invalid average length, must be at least one minute.");
      }
    },
    // add more properties as needed
  },
//   { collection: "media_list" }
);

const Media = mongoose.model("Media", MediaSchema);

module.exports = Media;
