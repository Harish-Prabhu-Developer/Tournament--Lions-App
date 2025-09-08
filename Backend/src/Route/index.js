import express from "express";
import AuthRouter from "./authRoute.js";
import UserRouter from "./userRoute.js";

const router = express.Router();
router.use("/auth",AuthRouter);
router.use("/users",UserRouter);
export default router;