import express, { Request, Response } from "express";
import { register,login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);
// router.post("/logout", logout as express.RequestHandler);

export default router;