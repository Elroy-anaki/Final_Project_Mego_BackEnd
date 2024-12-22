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
import reviewsRoutes from './routes/review.route.js'
import categoriesRoutes from './routes/category.route.js'
import ordersRoutes from './routes/order.route.js'
import tablesRoutes from './routes/table.route.js'
// import cortsRoutes from './routes/cart.route.js'



app.use('/auth', authRoutes)
app.use('/restaurant', restaurantRoutes);
app.use('/users', usersRoutes);
app.use('/meals', mealRoutes);
app.use('/employees', employeeRoutes)
app.use('/reviews', reviewsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/orders', ordersRoutes)
app.use('/tables', tablesRoutes)

// app.use('/carts', cortsRoutes)




app.listen(port, () => console.log(`Server running on port ${port}...`));