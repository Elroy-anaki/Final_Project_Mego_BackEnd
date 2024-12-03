// Config the env and DB conncetion
import { config } from "dotenv";
import { connectToMongoDB } from "./config/DB.config.js";
config();
connectToMongoDB();

// Define the server with express library
import express from "express";
const app = express();
const port = Number(process.env.PORT) || 3001;

// Global Middlewares (imports + use)
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes (imports + use)

app.listen(port, () => console.log(`Server running on port ${port}...`));
