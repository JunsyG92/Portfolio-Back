"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Context extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Context.belongsTo(models.Works, {
				foreignKey: {
					allowNull: false,
				},
				onDelete: "CASCADE",
			});
		}
	}
	Context.init(
		{
			work_id: DataTypes.INTEGER,
			title: DataTypes.STRING,
			content: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Context",
		}
	);
	return Context;
};
