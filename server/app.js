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

app.use(cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: ["http://localhost:8000","http://localhost:8001"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes (imports + use)
import usersRoutes from './routes/user.route.js'
import restaurantRoutes from './routes/restaurant.route.js';
import mealRoutes  from './routes/meal.route.js'


app.use('/users', usersRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/meals', mealRoutes);


app.listen(port, () => console.log(`Server running on port ${port}...`));
