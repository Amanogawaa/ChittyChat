import express from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { getUsers } from "../controller/user.controller.js";

const router = new express.Router();

router.get("/getusers", protectedRoute, getUsers);

export default router;
