import express from "express";
import { ForgetPass, loginUser, registerUser, ResetPassword } from "../Controller/authController.js";

const AuthRouter = express.Router();
AuthRouter.post("/register",registerUser);
AuthRouter.post("/login",loginUser);
AuthRouter.get("/forgetpass",ForgetPass);
AuthRouter.post("/reset-password", ResetPassword);
export default AuthRouter;