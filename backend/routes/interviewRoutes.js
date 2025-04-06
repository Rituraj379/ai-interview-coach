import express from "express";
import { createInterview } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/generate", createInterview);

export default router;
