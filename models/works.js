"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Works extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Works.hasMany(models.Context);
			models.Works.hasMany(models.Design);
			models.Works.hasMany(models.Introduction);
			models.Works.hasMany(models.Styleguide);
		}
	}
	Works.init(
		{
			post_title: DataTypes.STRING,
			post_excerpt: DataTypes.STRING,
			post_date: DataTypes.STRING,
			post_status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Works",
		}
	);
	return Works;
};
