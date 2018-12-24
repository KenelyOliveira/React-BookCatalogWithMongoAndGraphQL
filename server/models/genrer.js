const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genrerSchema = new Schema({
    description: String
});

module.exports = mongoose.model('Genrer', genrerSchema);