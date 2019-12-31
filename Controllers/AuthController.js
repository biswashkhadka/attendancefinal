var bcrypt = require('bcrypt');
var user= require('../Models/UserModel.js');

var jwt = require('jsonwebtoken');
//var token = jwt.sign({ _id: user._id, admin: true }, process.env.JWT_SECRET, { expiresIn: '1 week' });



function validator(req,res,next){
	//console.log(req,body);
if(req.body.username === ''){
		res.json({status:404,message:'username is required'})
}
else if(req.body.password === ''){
	res.json({status:404,message:'password is required'})
}
else{
	user.findOne({
		where:{
			username:req.body.username
			//password:req.body.password
		}
	})
	.then(function(result){
		if(result === null){
			status:200;
		}else{
			req.xyz = result.dataValues.password;
			next();
		}
	})
	//res.json({status:404,message:'username couldnot find'})
	.catch()
}
}


function passwordChecker(req,res,next){
	console.log(req.body.password)
	//console.log(req.body.username)

	//databaseko
	//bcrypt.compare(req.body.password,result.dataValues)
	bcrypt.compare(req.body.password, req.xyz)
	/*user.findOne({
		where:{
			username:req.body.username
			password:req.body.password
		}
	})*/
	.then(function(result){
		if(result === true){
			next();
		}else{

			res.status(500)
			res.json({status:500, message:'password not match'});
			next();

		}

	});
}

module.exports={
	passwordChecker,
	validator
}