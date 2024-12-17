import Restaurant from '../models/restaurant.model.js';
import cloudinary from '../config/cloudinary.config.js';

function createAvailabilityPipeline(date, time) {
    return [
        {
            $unwind: "$restaurantOccupancyTime"
        },
        {
            $unwind: "$restaurantOccupancyTime.slots"
        },
        {
            $match: {
                "restaurantOccupancyTime.date": date,         
                "restaurantOccupancyTime.slots.time": time,    
            }
        },
        {
            $project: {
                _id: 0,                                        
                time: "$restaurantOccupancyTime.slots.time",     
                remaining: "$restaurantOccupancyTime.slots.remaining" 
            }
        }
    ];
};

export const addRestaurant = async (req, res) => {
    try {
        if (!req.files || !req.files.restaurantImage || !req.files.restaurantLogo) {
            res.status(400).json({
                success: false,
                msg: 'Both restaurant image and logo are required!'
            });
        }

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

}










// async function isDateExist(date) {
//     try {
//         const resultByDate = await Restaurant.findOne({ "restaurantOccupancyTime.date": date }, { "restaurantOccupancyTime.$": 1 });
//         console.log("resultByDate", resultByDate)
//         if (resultByDate === null) return false;
//         else return resultByDate
//     } catch (error) {
//         throw error
//     }

// }

// async function checkRestaurantCapacity(hour, data) {
//     try {
//         console.log("DATA", data.restaurantOccupancyTime[0].slots)
//         const matchingSlots = data.restaurantOccupancyTime[0].slots.filter((slot) => {
//             return slot.time === hour && slot.remaining < 50;
//         });
//         console.log("hourResult", matchingSlots)
//         return matchingSlots
//     } catch (error) {
//         throw error

//     }
// }
//export const getFreeTimes = async (req, res) => {
    //     const { people, date, hour } = req.body;
    //     console.log(people)
    //     console.log(date)
    //     console.log(hour)
    //     try {
    //         const dateExist = await isDateExist(date)
    //         console.log("dateExist", dateExist)
    //         if (!dateExist) {
    //             res.status(200).json({
    //                 success: true,
    //                 msg: "All hours avalible"
    //             })
    //         }
    //         const hours = await checkRestaurantCapacity(hour, dateExist)
    //         console.log("hours", hours)
    //         // const hourResult = resultByDate.restaurantOccupancyTime[0].slots.some((slot) => slot.time === hour && slot.remaining < 50 )
    //         // console.log(hourResult)
    //         res.send("Fff")
    
    //     } catch (error) {
    //         console.log("error", error)
    //         res.send("No")
    
    //     }
    
    
    
    
    // }
    