const { Sequelize } = require("sequelize");

const db = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mysql",
	}
);

try {
	await db.authenticate();
	console.log("Connection has been established succesfully.");
} catch (error) {
	console.error("Unable to connect to the database: ", error);
}

module.exports = db;
