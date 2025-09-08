// PaymentModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";
import UserModel from "./UserModel.js";
import TournamentModel from "./TournamentModel.js";

const PaymentModel = sequelize.define(
  "Payment",
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
    tournament_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TournamentModel,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("UPI", "BankTransfer", "Card", "Wallet"),
      allowNull: true,
    },
    bank_account: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    ifsc_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    bank_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("success", "failed", "pending"),
      defaultValue: "pending",
    },

  },
  {
    tableName: "payments",
    timestamps: true, // no createdAt/updatedAt auto columns
  }
);

// Associations
PaymentModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
UserModel.hasMany(PaymentModel, { foreignKey: "user_id", as: "payments" });

PaymentModel.belongsTo(TournamentModel, { foreignKey: "tournament_id", as: "tournament" });
TournamentModel.hasMany(PaymentModel, { foreignKey: "tournament_id", as: "payments" });

export default PaymentModel;
