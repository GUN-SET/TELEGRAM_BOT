const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
	'MY_DB_NAME',
	'MY_USER_NAME',
	'MY_DB_PASSWORD',
	{
		dialect: 'postgres',
		host: 'localhost',
		port: '5432'
	}
)