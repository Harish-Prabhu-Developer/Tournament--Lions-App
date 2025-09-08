// OrganizerModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import TournamentModel from "./TournamentModel.js";

const OrganizerModel = sequelize.define(
  "Organizer",
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
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50), // President, Secretary, Treasurer
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    whatsapp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "organizers",
    timestamps: true, // no createdAt/updatedAt in schema
  }
);

// Associations
OrganizerModel.belongsTo(TournamentModel, { foreignKey: "tournament_id", as: "tournament" });
TournamentModel.hasMany(OrganizerModel, { foreignKey: "tournament_id", as: "organizers" });

export default OrganizerModel;
