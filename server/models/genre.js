const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    description: String
});

module.exports = mongoose.model('Genre', genreSchema);