// authController.js
import bcrypt from "bcryptjs";
import UserModel from "../Model/UserModel.js";
import generateToken from "../Config/jwthelper.js";
import { Op } from "sequelize";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role, dob, gender } = req.body;

    // check existing user by phone OR email
    const existingUser = await UserModel.findOne({
      where: { [Op.or]: [{ phone }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "player", // default fallback
      dob,
      gender,
    });

    res.status(201).json({
      msg: "User registered successfully",
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
    console.error("Register Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // find user by phone
    const user = await UserModel.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // generate JWT
    const token = generateToken({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        dob: user.dob,
        gender: user.gender,
      
    })
    res.json({
      msg: "Login successful",
      token
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
