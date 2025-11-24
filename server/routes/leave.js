import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { addLeave, getLeaves, getLeave } from "../controllers/leaveController.js";


const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/:id", authMiddleware, getLeave);
router.get("/", authMiddleware, getLeaves);

export default router;
