var express = require('express');
var mongoose = require("mongoose");
var morgan = require('morgan');
var dotenv = require('dotenv').config();
var auth = require('./auth');
var cors = require('cors');

var app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));

var bodyParser = require('body-parser')
app.use(express.static(__dirname + "/upload"));

app.use(bodyParser.urlencoded({extended:true}));

var studentModel= require('./Models/StudentModel.js');
var teacher=require('./Models/teacher.js');
var teacherController=require('./Controllers/teacherController');
var studentcontroller =require('./Controllers/studentController.js');
var uploadController = require("./Controllers/upload.js");
var notecontroller = require("./Controllers/Notecontroller.js");
var notemodel = require("./Models/Note.js");
var schedulecontroller = require("./Controllers/scheduleController.js");
var schedulemodel = require("./Models/Schedule.js");

app.use('/upload', uploadController);

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, 
	useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/students', studentcontroller);
app.use('/upload', uploadController);
app.use('/teacher', teacherController);
app.use('/note', notecontroller);
app.use('/schedule', schedulecontroller);

app.use(auth.verifyUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});






/*app.post('/registration', 
	studentcontroller.validator, studentcontroller.checkIfUserExists,
	  studentcontroller.getHash,studentcontroller.actualRegister)

app.post('/login', authcontroller.validator, authcontroller.passwordChecker,authcontroller.jwtTokenGen)

app.delete('/user/:id', authcontroller.verifyToken, studentcontroller.deleteUser)

app.put('/update/:id', authcontroller.verifyToken, studentcontroller.editUser)
*/


//POSTMAN: to create localhost
app.get('/hospitallist', function(req,res,next){
	console.log(req.query);
	res.send('req received');
})

app.post('/registration',function(req,res,next){
	console.log(req.body);
	res.send('req registration received');
})
app.listen(3001);

module.exports = app;

app.get('/hospitalliust/:id',
	function(req,res,next){
		console.log(req);
		res.send('req received')
	}
	)