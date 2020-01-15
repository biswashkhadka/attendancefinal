
var dbConfig = require('./Config/databaseConfig.js')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var multer = require('multer');
app.use(express.static(__dirname + "/upload"));



var studentModel= require('./Models/StudentModel.js');
var studentcontroller =require('./Controllers/studentController.js');
var authcontroller =require('./Controllers/AuthController.js');
var uploadController = require("./Controllers/upload.js");
app.use('/upload', uploadController);

app.use(bodyParser.urlencoded({extended:true}));

app.post('/registration', 
	studentcontroller.validator, studentcontroller.checkIfUserExists,
	  studentcontroller.getHash,studentcontroller.actualRegister)

app.post('/login', authcontroller.validator, authcontroller.passwordChecker,authcontroller.jwtTokenGen)

app.delete('/user/:id', authcontroller.verifyToken, studentcontroller.deleteUser)



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