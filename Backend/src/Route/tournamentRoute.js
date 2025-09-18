import express from "express";
import { authenticateUser } from "../Middleware/authMiddleware.js";
import { authorizeRoles } from "../Middleware/roleMiddleware.js";
import { createTournament, deleteTournament, getAllTournaments, getTournamentById, updateTournament } from "../Controller/TournamentController.js";


const TournamentRouter =express.Router();

TournamentRouter.post("/create",authenticateUser,authorizeRoles(["admin","organizer"]),createTournament);
TournamentRouter.get("/all",authenticateUser,getAllTournaments);
TournamentRouter.get("/get/:id",authenticateUser,authorizeRoles(["admin","organizer"]),getTournamentById);
TournamentRouter.put("/update/:id",authenticateUser,authorizeRoles(["admin","organizer"]),updateTournament);
TournamentRouter.delete("/remove/:id",authenticateUser,authorizeRoles(["admin","organizer"]),deleteTournament);

export default TournamentRouter;