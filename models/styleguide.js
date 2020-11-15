"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Styleguide extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Styleguide.belongsTo(models.Works, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			});
		}
	}
	Styleguide.init(
		{
			work_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			colors: DataTypes.STRING,
			typography: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Styleguide",
		}
	);
	return Styleguide;
};
