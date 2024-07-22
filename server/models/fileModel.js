const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String
});

const File = mongoose.model('File', fileSchema);
module.exports = File;