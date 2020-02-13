var mongoose = require('mongoose');

var attendanceSchema = new mongoose.Schema({
    students: {
        type: String,
        required: true
    },
    present: {
        type: Boolean,
    },
     absent: {
        type: Boolean,
    },
     late: {
        type: Boolean,
    }
});

module.exports = mongoose.model('attendance', attendanceSchema);