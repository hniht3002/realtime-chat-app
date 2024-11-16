import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";
import { body } from "express-validator";
const router = express.Router();

router.post("/signup", signup)

router.post("/login", [
    body("username").trim().isLength({min: 6}).withMessage("Username must be at least 6 characters long"),
    body("password").trim().isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
], login)

router.post("/logout", logout)

export default router;