var bcrypt = require('bcrypt');
var user= require('../Models/StudentModel.js');

function validator(req,res,next){
	//console.log(req,body);
if(req.body.fullname === ''){
		res.json({status:404,message:'fullname is required'})

}else if(req.body.address === ''){
	res.json({status:404,message:'address is required'})
}
else if(req.body.phoneno === ''){
	res.json({status:404,message:'phoneno is required'})
}

else if(req.body.email === ''){
	res.json({status:404,message:'email is required'})
}
else if(req.body.batch === ''){
	res.json({status:404,message:'batch is required'})
}
else if(req.body.password === ''){
	res.json({status:404,message:'password is required'})}
else{
	//res.json({status:200, mess:'hagya'})
	next();
}
}

function getHash(req,res,next){
	var saltRounds = 10;
	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(hash){
			console.log(hash);
			req.hashKey=hash;
			//res.send(hash);
			actualRegister(req,res,next);
			//next();
		}
		if(err){
			res.json({status:500, message:'couldnot hash the message'});
			next();
		}
	});

}

function actualRegister(req,res,next){
	//db table ma insert garna
	user.create({
		fullname:req.body.fullname,
		address:req.body.address,
		phoneno:req.body.phoneno,
		email:req.body.email,
		batch:req.body.batch,
		password:req.hashKey
	})
	.then(function(result){
		//console.log(result);
		res.json({status:201, message:'registered successfully'});
	})
	.catch(function(err){
		//console.log(err)
		res.json(err);

	})
	}

	function checkIfUserExists(req,res,next){
		console.log("inside XX");
		//check if username already exists
		user.findOne({
			where:{email:req.body.email}
		})
		.then(function(result){
			//console.log(result);
			//res.json(result);
			console.log("inside check if user exist");
			if(result == null){

			console.log("inside check if user exist if");
			next();
		}else{

			console.log("inside check if user existn else");
			res.json({status:409, message:'email already exists'});
		}
		
		})
		.catch(function(err){
		//console.log(err)
		res.json(err);
	})

	}

	function deleteUser(req,res,next){
		//console.log('deletehere')
		if(req.params.id===null ||req.params.id===undefined){
			/*res.status(404);
			res.json({status:404, message: 'Id not provided'})*/
	}
	user.destroy({
		where:{
			id:req.params.id
		}
	})
	.then(function(result){
		console.log(result);
		if(result === 0){
			//res.status(500);
			res.json({status:500,message:"couldnot delete"})
		}else
		{
		//res.status(200);
			res.json({status:200,message:"user deleted successfully"})
	}
	})
	.catch(function(err){

	}); 
}


	

module.exports ={validator,checkIfUserExists, getHash, actualRegister, deleteUser}