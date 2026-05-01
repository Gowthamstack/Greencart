import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary=async()=>{
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
};
export default connectCloudinary;

// This code configures Cloudinary with the credentials from the environment variables.