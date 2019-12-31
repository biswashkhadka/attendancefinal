

var dbConfig= require('./Config/databaseConfig.js')
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var swaggerJSDoc =require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
var swaggerDefinition = {
	info:{
		title:'CollegeAttendance',
		description:'This is my app documentation',
		version:'1.0.0'
	},
	securityDefinitions: {
		bearerAuth:{
			type:'apiKey',
			name:'authorization',
			in:'header',
			scheme:'bearer',
		}
	},
	host:'localhost:3001',
	basepath:'/'
}
var swaggerOptions = {
swaggerDefinition,
apis:['./index.js']
}

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
//IMAGE
//var multer= require('multer');
/*var upload= multer({dest:'images/'})
app.post('/test', upload.single('imagex'), function(req,res,next){
	console.log(req.files);
	console.log(req.body);
	 }
	 )*/


var userModel= require('./Models/UserModel.js');
var usercontroller =require('./Controllers/userController.js');
var authcontroller =require('./Controllers/AuthController.js');


app.use(bodyParser.urlencoded({extended:true}));



//registrationAPIDocumentation
/***
* @swagger
* /registration:
*  post:
*   tags:
*    - Users
*   description: User Registration Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide password
*    - name: address
*      in: formData
*      type: string
*      required: true
*      description: Please provide address
*   responses:
*    201:
*     description: registered successfully
*    409:
*     description: user already exists
*    500:
*     description: internal server error
*/


app.post('/registration', 
	usercontroller.validator, usercontroller.checkIfUserExists,
	  usercontroller.getHash,usercontroller.actualRegister)

/***
* @swagger
* /login:
*  post:
*   tags:
*    - Users
*   description: User Login Testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide password
*   responses:
*    201:
*     description: login successfully
*/
app.post('/login', authcontroller.validator, authcontroller.passwordChecker, authcontroller.jwtTokenGen)


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *      - Users
 *     security:
 *      - bearerAuth: []
 *     description: Deletes a single user
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/x-www-form-urlencoded
 *     parameters:
 *      - name: id
 *        in: path
 *     responses:
 *       200:
 *         description: Successfully deleted
 */


app.delete('/user/:id', authcontroller.verifyToken, usercontroller.deleteUser)
//app.put('/user/:id', authcontroller.verifyToken, usercontroller.editUser)
//app.listen(3000);
  /*app.listen(3000, () => {
     console.log('listen on 3000')
   })
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