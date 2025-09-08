// models/CategoryModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import TournamentModel from "./TournamentModel.js";


const CategoryModel = sequelize.define(
  "Category",
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false, // e.g. "Under 15 Boys Doubles"
    },
    type: {
      type: DataTypes.ENUM("singles", "doubles", "mixed"),
      allowNull: true,
    },
    age_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    entry_fee: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    prize_first: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    prize_second: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
  },
  {
    tableName: "categories",
    timestamps: true, // no createdAt/updatedAt in schema
  }
);

// Associations
CategoryModel.belongsTo(TournamentModel, { foreignKey: "tournament_id", as: "tournament" });
TournamentModel.hasMany(CategoryModel, { foreignKey: "tournament_id", as: "categories" });

export default CategoryModel;
