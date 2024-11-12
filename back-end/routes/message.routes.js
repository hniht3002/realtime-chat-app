import express from "express";
import { sendMessage } from "../controllers/message.controllers.js";
import { getMessage } from "../controllers/message.controllers.js";
import protectedRoute from "../middlewares/protectedRoute.middleware.js";

const router = express.Router();

router.get('/:userId', protectedRoute, getMessage)

router.post('/send/:userId', protectedRoute, sendMessage)

export default router;