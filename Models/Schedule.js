
var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('schedule', scheduleSchema);