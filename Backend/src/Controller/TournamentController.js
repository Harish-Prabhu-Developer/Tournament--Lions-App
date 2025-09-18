// TournamentController.js
import TournamentModel from "../Model/TournamentModel.js";
import UserModel from "../Model/UserModel.js";

// Create a new tournament
export const createTournament = async (req, res) => {
  try {
    const {title,description,organizer_id,venue,city,state,latitude,longitude,start_date,end_date,last_entry_date,total_prize,status,poster} = req.body;
    // ensure all required fields are provided
    if (title|start_date|end_date|last_entry_date|total_prize) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    // ensure organizer exists
    const organizer = await UserModel.findByPk(organizer_id);
    if (!organizer) {
      return res.status(404).json({ msg: "Organizer not found" });
    }
    const newTournament = await TournamentModel.create({
      title,
      description,
      organizer_id,
      venue,
      city,
      state,
      latitude,
      longitude,
      start_date,
      end_date,
      last_entry_date,
      total_prize,
      status:status?status:'upcoming',
      poster
    });
    res.status(201).json({
      msg: "Tournament created successfully",
      newTournament
    });
  } catch (error) {
    console.error("Create Tournament Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all tournaments
export const getAllTournaments = async (req, res) => {
  try {
    const role = req.user.role;
    const tournaments = await TournamentModel.findAll({
        include:[{model:UserModel,as:'organizer',attributes:["id","name","phone","email"]}],
        order:[["createdAt","DESC"]],
    });

    if (!tournaments) {
        return res.status(404).json({ msg: "Tournament not found" });
    }
    res.status(200).json(tournaments);

  } catch (error) {
        console.error("Get All Tournaments Error:", error.message);
    res.status(500).json({ msg: "Server error",error:error.message });

  }
};

// Get a specific tournament by ID
export const getTournamentById = async (req, res) => {
  try {
    const id = req.params;
     const tournament = await TournamentModel.findByPk(id, {
      include: [{ model: UserModel, as: "organizer", attributes: ["id", "name", "email", "phone"] }],
    });

    if (!tournament) {
      return res.status(404).json({ msg: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    console.error("Get Tournament By ID Error:", error.message);
    res.status(500).json({ msg: "Server error",error:error.message });
  }
};

// Update a tournament by ID
export const updateTournament = async (req, res) => {
  try {
    const id =req.params;
    const data =req.body;
    const tournament =await TournamentModel.findByPk(id);
    if (!tournament) {
        return res.status(404).json({ msg: "Tournament not found" });
    }
    await tournament.update(data);
    res.status(200).json({msg:"Tournament updated successfully",tournament});

  } catch (error) {
    console.error("Update Tournament Error:", error.message);
    res.status(500).json({ msg: "Server error",error:error.message });    
  }
};

// Delete a tournament by ID
export const deleteTournament = async (req, res) => {
  try {
    const id =req.params;
    const tournament =await TournamentModel.findByPk(id);
    if (!tournament) {
         return res.status(404).json({ msg: "Tournament not found" });
    }
    await tournament.destroy();
    res.json({ msg: "Tournament deleted successfully",tournament });
  } catch (error) {
    console.error("Delete Tournament Error:", error.message);
    res.status(500).json({ msg: "Server error",error:error.message });    
  }
};
