"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Introduction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Introduction.belongsTo(models.Works, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			});
		}
	}
	Introduction.init(
		{
			work_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
			roles: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Introduction",
		}
	);
	return Introduction;
};
