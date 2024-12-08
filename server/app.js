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
    origin: ["http://localhost:8000", "http://localhost:8001"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes (imports + use)
import authRoutes from './routes/auth.route.js'
import restaurantRoutes from './routes/restaurant.route.js';
import usersRoutes from './routes/user.route.js'
import mealRoutes from './routes/meal.route.js'
import employeeRoutes from './routes/employee.route.js'
import reviewsRoutes from './routes/reviews.route.js'



app.use('/auth', authRoutes)
app.use('/restaurant', restaurantRoutes);
app.use('/users', usersRoutes);
app.use('/meals', mealRoutes);
app.use('/employees', employeeRoutes)
app.use('/reviews', reviewsRoutes)



app.listen(port, () => console.log(`Server running on port ${port}...`));
