var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        maxlength:10,
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

    admissionnum: {
        type: String,
        required: true,
        minlength:3,
        unique:true
    },
    IOT:{
        type:String,
    },
     Android:{
        type:String,
    },
     API:{
        type:String,
    }
});

module.exports = mongoose.model('student', studentSchema);