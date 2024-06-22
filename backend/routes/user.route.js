import express from "express";
import { deleteUserProfile, getAllUsers, getUserProfile, updateUserProfile } from "../controllers/user.controller.js";
import { adminCheck } from "../middleWare/adminCheck.js";
import { protectRoute } from "../middleWare/protectRoute.js";

const router = express.Router();

router.get("/", adminCheck, getAllUsers);
router.get("/getuser", protectRoute, getUserProfile);
router.post("/update",protectRoute, updateUserProfile)
router.delete("/delete/:id",protectRoute, deleteUserProfile)

export default router;
