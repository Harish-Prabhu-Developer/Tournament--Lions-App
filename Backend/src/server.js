import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize, connectDB } from "./Config/db.js";
import router from "./Route/index.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DB Connection
connectDB()
  .then(async () => {
    // ✅ Sync models after connection
    await sequelize.sync({ alter: true }); // use { force: true } only for dev (drops tables)
    console.log("✅ All models synchronized!");

    // Start server only after DB is ready
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB. Server not started:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("🎉 Tournament API is running!");
});

app.use("/tournaments",router);