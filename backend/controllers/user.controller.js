import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, email, currentPassword, newPassword, address, phone } =
    req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        message: "Please enter both current and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({
          error: "Current password is incorrect",
        });
      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters",
        });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const validateEmail = await User.findOne({ email });
      if (validateEmail) {
        return res
          .status(400)
          .json({ error: "already have an account with this email" });
      }
    }

    if (phone) {
      const phoneRegex =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number" });
      }

      const validatePhone = await User.findOne({ phone });
      if (validatePhone) {
        return res
          .status(400)
          .json({ error: "already have an account with this phone" });
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUserProfile controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.jwt;
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);

    if(userId !== id && role !== "admin"){
      return res.status(401).json({ error: "Unauthorized you can't delete other users" });
    }

    if (userId == id || role === "admin") {
      await User.findByIdAndDelete(id);
      res.status(201).json({
        message: "User deleted successfully",
      });
    }else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log("Error in deleteUserProfile controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
