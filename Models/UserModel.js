

var dbConfig= require('../Config/databaseConfig.js')
console.log(dbConfig.Sequelize)


var user= dbConfig.sequelize.define('user',
//attributes
{
	id:{
		type:dbConfig.Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	username:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
	},
	password:{
		type:dbConfig.Sequelize.TEXT,
		allowNull: false
}
},
/*{
	freezeTable:true, //tablename chnage garna yeo freezeTable garekooo
	tableName:'user_table' //tablename changed


}*/


	)

user.sync({force:false})
.then(function(result){
	console.log(result);


})
.catch(function(err){
	console.log(err);
})

module.exports=user;