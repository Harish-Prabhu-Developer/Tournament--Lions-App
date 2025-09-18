import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { sequelize, connectDB } from "./Config/db.js";
import router from "./Route/index.js";
import https from "https";
import {CronJob} from "cron";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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
    console.error("❌ Failed to connect DB. Server not started:", err.message);
  });

//Cron Job
const Job=new CronJob("*/14 * * * *", function(){
  https.get(process.env.API_URL, (res) => {
      console.log("Now Working Time : ", new Date().toUTCString());
      if(res.statusCode===200) console.log("The Tournament Server GET REQUEST IS WORKING");
      else console.log("The Tournament Server WORKING Failed for Status Code : ", res.statusCode);
      
  }).on('error', (err) => {
      console.log("WHILE GET Error on Cron Job : ", err.message);
  });
});
// Start Cron Job
Job.start();

// Routes
app.get("/", (req, res) => {
  res.send("🎉 Tournament Backend is running!");
});

app.use("/tournaments", router);
