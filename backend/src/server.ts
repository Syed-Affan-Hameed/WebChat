import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT =process.env.PORT || 5007;
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.get("/", (req, res) => {

	res.send("Hello World!!!");
});
server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
