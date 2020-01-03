

var express = require('express');
var bodyParser = require('body-parser')
var app = express();



var studentModel= require('./Models/StudentModel.js');
var studentcontroller =require('./Controllers/studentController.js');
var authcontroller =require('./Controllers/AuthController.js');
app.use(bodyParser.urlencoded({extended:true}));

app.post('/registration', 
	studentcontroller.validator, studentcontroller.checkIfUserExists,
	  studentcontroller.getHash,studentcontroller.actualRegister)

app.post('/login', authcontroller.validator, authcontroller.passwordChecker,authcontroller.jwtTokenGen)



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