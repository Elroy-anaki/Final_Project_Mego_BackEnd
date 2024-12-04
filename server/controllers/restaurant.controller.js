import Restaurant from '../models/restaurants.model.js';
import cloudinary from '../config/cloudinary.config.js';

export const addRestaurant = async (req, res) => {
    try {
        if (!req.files || !req.files.restaurantImage || !req.files.restaurantLogo) {
            return res.status(400).json({
                success: false,
                msg: 'Both restaurant image and logo are required!'
            });
        }

        console.log('Uploading to Cloudinary...');
        const [restaurantImageDetails, restaurantLogoDetails] = await Promise.all([
            cloudinary.uploader.upload(req.files.restaurantImage[0].path),
            cloudinary.uploader.upload(req.files.restaurantLogo[0].path)
        ]);
        req.body.restaurantImage = restaurantImageDetails.secure_url;
        req.body.restaurantLogo = restaurantLogoDetails.secure_url;


        console.log('Restaurant data to be saved:', req.body);
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
        const [restaurant] = await Restaurant.find()
        
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

}