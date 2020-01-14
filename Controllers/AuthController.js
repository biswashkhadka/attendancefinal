var bcrypt = require('bcrypt');
var user= require('../Models/StudentModel.js');
var jwt = require('jsonwebtoken');





function validator(req,res,next){
	//console.log(req,body);
if(req.body.email === ''){
		res.json({status:404,message:'email is required'})
}
else if(req.body.password === ''){
	res.json({status:404,message:'password is required'})
}
else{
	user.findOne({
		where:{
			email:req.body.email
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
	
	bcrypt.compare(req.body.password, req.xyz)
	
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

function jwtTokenGen(req,res,next){

	var myPayload = {
		email:req.body.email
		
	}


	jwt.sign(myPayload, 'secretOrPrivateKey', {expiresIn: "10h"}, function(err,result){
		console.log(result);
		console.log(err);
		res.json({"user token": result})
	})

}


	function verifyToken(req,res,next){
	var token=	req.headers.authorization.slice(7,req.headers.authorization.length)

	

		jwt.verify(token,'secretOrPrivateKey', function(err,result){
			//console.log(err,result)
			if(result){
				next();
			}else{
				//res.status(500)
				res.json({status:500,message:'cannot delete'});
				//next();
			}

		})

	}


module.exports={
	passwordChecker,
	validator,jwtTokenGen
	,verifyToken}