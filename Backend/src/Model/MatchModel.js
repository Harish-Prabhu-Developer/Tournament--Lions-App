// MatchModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import TournamentModel from "./TournamentModel.js";
import CategoryModel from "./CategoryModel.js";
import UserModel from "./UserModel.js";

const MatchModel = sequelize.define(
  "Match",
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
    round: {
      type: DataTypes.STRING(50), // e.g., "Quarter-final"
      allowNull: true,
    },
    player1_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    player2_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    scheduled_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    court: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    score_player1: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    score_player2: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    winner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("scheduled", "ongoing", "completed"),
      defaultValue: "scheduled",
    },
  },
  {
    tableName: "matches",
    timestamps: true, // we already track with scheduled_time
  }
);

// Associations
MatchModel.belongsTo(TournamentModel, { foreignKey: "tournament_id", as: "tournament" });
TournamentModel.hasMany(MatchModel, { foreignKey: "tournament_id", as: "matches" });

MatchModel.belongsTo(CategoryModel, { foreignKey: "category_id", as: "category" });
CategoryModel.hasMany(MatchModel, { foreignKey: "category_id", as: "matches" });

MatchModel.belongsTo(UserModel, { foreignKey: "player1_id", as: "player1" });
MatchModel.belongsTo(UserModel, { foreignKey: "player2_id", as: "player2" });
MatchModel.belongsTo(UserModel, { foreignKey: "winner_id", as: "winner" });

UserModel.hasMany(MatchModel, { foreignKey: "player1_id", as: "matches_as_player1" });
UserModel.hasMany(MatchModel, { foreignKey: "player2_id", as: "matches_as_player2" });
UserModel.hasMany(MatchModel, { foreignKey: "winner_id", as: "matches_won" });

export default MatchModel;
