

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({extended:true}));


//POSTMAN: to create localhost
app.get('/hospitallist', function(req,res,next){
	console.log(req.query);
	res.send('req received');
})

app.post('/registration',function(req,res,next){
	console.log(req.body);
	res.send('req registration received');
})
app.listen(3000);

module.exports = app;

app.get('/hospitalliust/:id',
	function(req,res,next){
		console.log(req);
		res.send('req received')
	}
	)