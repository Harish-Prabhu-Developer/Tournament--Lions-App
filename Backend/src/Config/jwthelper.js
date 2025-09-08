import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { 
    expiresIn: "20d"
     });
  return token;
};

export default generateToken;