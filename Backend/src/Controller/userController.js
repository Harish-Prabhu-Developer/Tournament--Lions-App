// userController.js
import UserModel from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, dob, gender } = req.body;

    // Check if user exists by phone or email
    const existingUser = await UserModel.findOne({
      where: { [Op.or]: [{ phone }, { email }] },
    });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "player",
      dob,
      gender,
    });

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        role: newUser.role,
        dob: newUser.dob,
        gender: newUser.gender,
      },
    });
  } catch (error) {
    console.error("Create User Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, password, role, dob, gender } = req.body;

    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Hash password if provided
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      password: hashedPassword,
      role: role || user.role,
      dob: dob || user.dob,
      gender: gender || user.gender,
    });

    res.json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error("Update User Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.destroy();
    res.json({ msg: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Get User Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] }, // don't send passwords
      order: [["id", "ASC"]],  //Order by ASc
    });
    res.json({ users });
  } catch (error) {
    console.error("Get All Users Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
