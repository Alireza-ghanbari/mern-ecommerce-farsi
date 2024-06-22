import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const adminCheck = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    if(!token){
        return res
        .status(401)
        .json({ error: "Unauthorized: No Token Provided" });
    }

    const { userId: id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({ error: "User Not Found" });
    }

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "You are not athorized to perform this action" });
    }

    next();
    
  } catch (error) {
    console.log("Error in adminCheck middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};