import express from "express";
import { sendMessage, getMessages } from "../controller/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = new express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
