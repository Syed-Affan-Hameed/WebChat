import express from "express";
import { getMessages, getUsersWithConversations, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const messageRouter = express.Router();

messageRouter.post("/sendMessage/:id",protectRoute,sendMessage);
messageRouter.get("/getMessages/:id",protectRoute,getMessages);
messageRouter.get("/getUsersWithConversations",protectRoute,getUsersWithConversations)

export default messageRouter;