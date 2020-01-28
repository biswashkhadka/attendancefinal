var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String
    
    },
    module: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },

    password: {
        type: String,
        required: true,
        minlength:6
    },
    
    image: {
        type: String
    },
   
});

module.exports = mongoose.model('teacher', teacherSchema);