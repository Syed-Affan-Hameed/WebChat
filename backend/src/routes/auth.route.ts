import express from "express";
import { register, login, logout ,getMe} from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

authRouter.post("/logout", async (req, res, next) => {
    try {
        await logout(req, res);
    } catch (error) {
        next(error);
    }
});

authRouter.get("/getMe", protectRoute ,async (req, res, next): Promise<any> => {
    try {
        await getMe(req, res);
    } catch (error) {
        next(error);
    }
});

export default authRouter;