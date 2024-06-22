import express from "express";
import { adminCheck } from "../middleWare/adminCheck.js"
import { addCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategory)
router.post("/add", adminCheck, addCategory)
router.patch("/update/:id", adminCheck, updateCategory)
router.delete("/delete/:id", adminCheck, deleteCategory)

export default router