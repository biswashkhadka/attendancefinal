var express = require('express');
var multer = require('multer');
var path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

var uploadcontroller = express.Router();

uploadcontroller.route('/')
    .post(upload.single('imageFile'), (req, res) => {
        res.json(req.file);
    });

module.exports = uploadcontroller;