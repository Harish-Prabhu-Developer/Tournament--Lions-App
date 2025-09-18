import express from "express";
import AuthRouter from "./authRoute.js";
import UserRouter from "./userRoute.js";
import TournamentRouter from "./tournamentRoute.js";

const router = express.Router();
router.use("/auth",AuthRouter);
router.use("/users",UserRouter);
router.use("/tournament",TournamentRouter);
export default router;