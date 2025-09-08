// db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("❌ DB_URL is missing in .env file");
}

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
});

// Test connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ Unable to connect to DB:", err);
    throw err;
  }
};

export { sequelize, connectDB };
