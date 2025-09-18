// Controller/authController.js
import bcrypt from "bcryptjs";
import UserModel from "../Model/UserModel.js";
import generateToken from "../Config/jwthelper.js";
import { Op } from "sequelize";
import { generateAvatar } from "../Utils/AvatarGenerator.js";
import path from "path";
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

    // // generate DiceBear avatar (use initials/phone/email as seed)
    // const avatarUrl = generateAvatar(name, role, gender);

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
        profile_image: newUser.profile_image,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { phone,email, password } = req.body;
if (!phone && !email) {
    return res.status(400).json({ msg: "Phone or Email is required" });
  }
  // find user by phone or email
  const user = await UserModel.findOne({
    where: {
      [Op.or]: [
        phone ? { phone } : null,
        email ? { email } : null,
      ].filter(Boolean), // removes null entries
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "password mismatch" });
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
      profile_image: user.profile_image,
    });

    res.json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// Forget Password Controller
export const ForgetPass = (req, res) => {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname, "public", "forget-password.html"));
};

// Reset Password
export const ResetPassword = async (req, res) => {
  try {
    const { emailOrPhone, newPassword } = req.body;

    if (!emailOrPhone) {
      return res.status(400).send("Email or Phone is required");
    }

    // Find user by email OR phone
    const user = await UserModel.findOne({
      where: {
        [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await user.update({ password: hashedPassword });

    // ✅ Send success HTML instead of plain text
    const __dirname = path.resolve();
    return res.sendFile(path.join(__dirname, "public", "Success.html"));

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).send("Server error");
  }
};

