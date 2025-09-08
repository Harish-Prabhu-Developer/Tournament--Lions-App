// UserModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255), // hashed password
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("player", "organizer", "admin"),
      allowNull: false,
      defaultValue: "player",
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    matches_played: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ranking_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
    timestamps: true, // disable Sequelize's default createdAt/updatedAt
  }
);

export default UserModel;
