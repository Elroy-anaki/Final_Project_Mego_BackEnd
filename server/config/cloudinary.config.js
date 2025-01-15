import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_NAME),
    api_key: String(process.env.CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET_KEY),
});

export default cloudinary;