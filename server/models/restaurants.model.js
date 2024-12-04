import { Schema, model } from "mongoose";


const slotSchema = new Schema({
    time: { type: String },
    reserved: { type: Number },
    remaining: { type: Number }
});

const dateSchema = new Schema({
    date: { type: String },
    slots: { type: [slotSchema] }
});

const restaurantSchema = new Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantLogo: {
        type: String,
        required: true
    },
    restaurantImage: {
        type: String,
        required: true
    },
    restaurantAddress: {
        type: String,
        required: true
    },
    restaurantMaxOccupancy: {
        type: Number,
        required: true
    },
    restaurantOccupancyTime: {
        type: [dateSchema],
        required: true,
        default: []
    }
}, {timestamps: true}
);

const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;