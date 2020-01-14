

var dbConfig= require('../Config/databaseConfig.js')
console.log(dbConfig.Sequelize)


var student= dbConfig.sequelize.define('Studentuser',
//attributes
{
	id:{
		type:dbConfig.Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	fullname:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	address:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	phoneno:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	email:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	batch:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	password:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
}
},
{
	paranoid:true
}


	)

student.sync({force:false})
.then(function(result){
	console.log(result);


})
.catch(function(err){
	console.log(err);
})

module.exports=student;