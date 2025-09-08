import express from "express";
import { loginUser, registerUser } from "../Controller/authController.js";

const AuthRouter = express.Router();
AuthRouter.post("/register",registerUser);
export default AuthRouter;