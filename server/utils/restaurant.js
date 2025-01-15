
export function createAvailabilityPipeline(date, time) {
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