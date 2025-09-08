// models/TournamentModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import UserModel from "./UserModel.js";

const TournamentModel = sequelize.define(
  "Tournament",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    venue: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    last_entry_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    total_prize: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("upcoming", "ongoing", "completed"),
      allowNull: false,
      defaultValue: "upcoming",
    },
    poster: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "tournaments",
    timestamps: true, // disable Sequelize auto createdAt/updatedAt
  }
);

// Associations
TournamentModel.belongsTo(UserModel, { foreignKey: "organizer_id", as: "organizer" });
UserModel.hasMany(TournamentModel, { foreignKey: "organizer_id", as: "tournaments" });

export default TournamentModel;
