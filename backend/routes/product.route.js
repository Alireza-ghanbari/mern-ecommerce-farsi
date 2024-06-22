import express from "express"
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controller.js"
import { adminCheck } from "../middleWare/adminCheck.js"

const router = express.Router()
 
router.get("/", getAllProducts)
router.get("/:id", getProduct)
router.post("/add", adminCheck, addProduct)
router.patch("/update/:id", adminCheck, updateProduct)
router.delete("/delete/:id", adminCheck, deleteProduct)

export default router