import Restaurant from '../models/restaurant.model.js';
import cloudinary from '../config/cloudinary.config.js';
import {createAvailabilityPipeline} from '../utils/restaurant.js'


export const addRestaurant = async (req, res) => {
    console.log(req.body)
    console.log(req.files.restaurantImage)
    console.log(req.files.restaurantLogo)
    try {
        // if (!req.files || !req.files.restaurantImage || !req.files.restaurantLogo) {
        //     res.status(400).json({
        //         success: false,
        //         msg: 'Both restaurant image and logo are required!'
        //     });
        // }

        const [restaurantImageDetails, restaurantLogoDetails] = await Promise.all([
            cloudinary.uploader.upload(req.files.restaurantImage[0].path),
            cloudinary.uploader.upload(req.files.restaurantLogo[0].path)
        ]);

        req.body.restaurantImage = restaurantImageDetails.secure_url;
        req.body.restaurantLogo = restaurantLogoDetails.secure_url;

        const restaurant = await Restaurant.create(req.body);

        res.status(201).json({
            success: true,
            msg: 'Restaurant created successfully!',
            data: restaurant
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: 'Error creating restaurant!',
            error: error
        });
    }
};

export const getRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({restaurantName: "Plate Ahead"})
        res.status(200).json({
            success: true,
            msg: 'Restaurant is here!',
            data: restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            msg: 'Not found restaurant!',
            error: error
        })
    }
};

export const getRemainingSeats = async (req, res) => {
    const { date, time } = req.body;
    console.log(date, time)
    try {
        if (!date || !time) throw new Error("Enter date and time")
        const pipeline = createAvailabilityPipeline(date, time)
        const remainingSeats = await Restaurant.aggregate(pipeline)
        if(remainingSeats.length === 0){
            res.status(200).json({
                success: true,
                msg: "Take",
                data: [{time: time,remaining:50 }]
            });
            return
        }
        res.status(200).json({
            success: true,
            msg: "Take",
            data: remainingSeats
        });

    } catch (error) {
        console.error("error", error);
        res.status(500).json({
            success: false,
            msg: error.message || "Enter date and time"
        })
    }
};

