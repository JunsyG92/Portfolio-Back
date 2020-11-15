"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Design extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Design.belongsTo(models.Works, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			});
		}
	}
	Design.init(
		{
			work_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			imageSmall: DataTypes.STRING,
			imageMedium: DataTypes.STRING,
			imageLarge: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Design",
		}
	);
	return Design;
};
