// NotificationModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import UserModel from "./UserModel.js";

const NotificationModel = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("reminder", "update", "payment", "general"),
      allowNull: true,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

  },
  {
    tableName: "notifications",
    timestamps: true, // disable Sequelize's auto timestamps
  }
);

// Associations
NotificationModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
UserModel.hasMany(NotificationModel, { foreignKey: "user_id", as: "notifications" });

export default NotificationModel;
