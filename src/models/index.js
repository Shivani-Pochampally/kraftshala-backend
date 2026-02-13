const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, DataTypes);
const Meeting = require("./meeting.model")(sequelize, DataTypes);

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Meeting };
