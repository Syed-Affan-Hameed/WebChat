import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket.js";
import path from "path";
import cors from "cors"

dotenv.config();

const PORT =process.env.PORT || 5007;
const __dirname =path.resolve();
app.use(express.json());
// Define allowed origins
const allowedOrigins = [
	"https://reactproductstore.onrender.com", // Deployed app
  ];
  
  // CORS Middleware
  app.use(cors({
	origin: function (origin, callback) {
	  // Allow requests with no origin (e.g., mobile apps, Postman)
	  if (!origin) return callback(null, true);
  
	  // Check if the origin is in the allowedOrigins array
	  if (allowedOrigins.includes(origin)) {
		return callback(null, true);  // Allow the request
	  } else {
		return callback(new Error('Not allowed by CORS'));  // Reject other origins
	  }
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowable methods
	credentials: true,  // Allow credentials like cookies if needed
	allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
  }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "development") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
	});
}

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/message",messageRoutes);
app.get("/", (req, res) => {

	res.send("Hello World!!!");
});
server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
