import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../Controller/userController.js";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import { authorizeRoles } from "../Middleware/roleMiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/create",authenticateUser,authorizeRoles(['admin','organizer']),createUser);
UserRouter.put("/update/:id",authenticateUser,authorizeRoles(['admin','organizer']),updateUser);
UserRouter.get("/all",authenticateUser,authorizeRoles(['admin','organizer']),getAllUsers);
UserRouter.delete("/remove/:id",authenticateUser,authorizeRoles(['admin']),deleteUser);
UserRouter.get("/:id",authenticateUser,authorizeRoles(['admin','organizer']),getUserById);

export default UserRouter;// Add user-related routes here, e.g. profile, update, etc.