import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authroute.js";
import router from "./routes/authroute.js";
import { testController } from "./middelwares/authMiddleware.js";

 
dotenv.config();
const app = express();
connectDB();
// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//rest api
app.get("/", (req, res) => {
  res.send("<h1>  Connected to server</h1>");
});
//for got password 
app.post("/register", authRoutes);
app.post("/login", authRoutes);
app.post("/forgot-password", authRoutes);
app.get("/test", authRoutes);
app.get("/user-auth", authRoutes);
//port
const PORT = process.env.PORT || 8080;
const dev = process.env.DEV_ENV;

//run listen
app.listen(PORT, () => {
  console.log(
    `SERVER IS CONNECTED TO PORT ${PORT} and in ${dev} environment`.bgGreen
      .white.italic.underline
  );
});


