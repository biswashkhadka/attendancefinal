
var mongoose = require('mongoose');

var noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('note', noteSchema);