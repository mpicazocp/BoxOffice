const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        img: {
            // img url to be rendered
            type: String,
            required: true,
            trim: false,
        },
        desc: {
            //  description
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: 'media_list' }
);

const Media = mongoose.model('Media', MediaSchema);

module.exports = Media;
