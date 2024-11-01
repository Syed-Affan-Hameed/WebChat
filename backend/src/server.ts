import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser"
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.get("/", (req, res) => {

	res.send("Hello World!!!");
});
app.listen(5000, () => {
	console.log("Server is running on port 5000");
});
