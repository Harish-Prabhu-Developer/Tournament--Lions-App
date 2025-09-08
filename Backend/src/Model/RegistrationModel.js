// models/RegistrationModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import TournamentModel from "./TournamentModel.js";
import UserModel from "./UserModel.js";
import CategoryModel from "./CategoryModel.js";

const RegistrationModel = sequelize.define(
  "Registration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TournamentModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    player1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    player2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "registrations",
    timestamps: true, // no createdAt/updatedAt in schema
  }
);

// Associations
RegistrationModel.belongsTo(TournamentModel, { foreignKey: "tournament_id", as: "tournament" });
TournamentModel.hasMany(RegistrationModel, { foreignKey: "tournament_id", as: "registrations" });

RegistrationModel.belongsTo(CategoryModel, { foreignKey: "category_id", as: "category" });
CategoryModel.hasMany(RegistrationModel, { foreignKey: "category_id", as: "registrations" });

RegistrationModel.belongsTo(UserModel, { foreignKey: "player1_id", as: "player1" });
RegistrationModel.belongsTo(UserModel, { foreignKey: "player2_id", as: "player2" });

UserModel.hasMany(RegistrationModel, { foreignKey: "player1_id", as: "registrations_as_player1" });
UserModel.hasMany(RegistrationModel, { foreignKey: "player2_id", as: "registrations_as_player2" });

export default RegistrationModel;
