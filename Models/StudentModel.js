var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneno: {
        type: String,
        required:true
    },
    address: {
        type: String,
        maxlength:8,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength:6
    },
    
    image: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('student', studentSchema);