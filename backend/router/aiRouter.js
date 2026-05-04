import express from "express";
import { suggestDoctor } from "../controller/aiController.js";

const router = express.Router();

router.post("/ai-suggest-doctor", suggestDoctor);

export default router;
