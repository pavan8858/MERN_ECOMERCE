import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectCloudinary = () => {
  
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary Connected Successfully");
};

export default connectCloudinary; // Use ES module export
